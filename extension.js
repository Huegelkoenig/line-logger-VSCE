const vscode = require('vscode');

//the following tokens support multi-line-comments in Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
const standardTokens = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
const leftTokens = [/\/\*LL:L\*\//g, /<!--LL:L-->/g, /\(\*LL:L\*\)/g, /<#LL:L#>/g, /{\*LL:L\*}/g, /%{LL:L%}/g, /--\[\[LL:L\]\]/g];
const rightTokens = [/\/\*LL:R\*\//g, /<!--LL:R-->/g, /\(\*LL:R\*\)/g, /<#LL:R#>/g, /{\*LL:R\*}/g, /%{LL:R%}/g, /--\[\[LL:R\]\]/g];

//gets the starting positions of the tokens
function tokenStartPositions(document, regexArray){
  let positions = [];
  regexArray.forEach(regex=>{    
    let match;
    let text = document.getText(); //must be reloaded for every regex
    while ((match = regex.exec(text)) !== null) {
      positions.push(document.positionAt(match.index)); //position on the left side of the token
    }
  });
  return positions;
}

//gets the ending positions of the tokens
function tokenEndPositions(document, regexArray){
  let positions = [];
  regexArray.forEach(regex=>{
    let match;
    let text = document.getText(); //must be reloaded for every regex
    while ((match = regex.exec(text)) !== null) {
      positions.push(document.positionAt(match.index + match[0].length)); //position of the right side of the token
    }
  });
  return positions;
}

//gets the ranges of the numbers adjacent to the left side of the tokens
function getRangesOfDigitsLeft(document, positions){
  let ranges = [];
  positions.forEach(position=>{
    let startCharacterPos = 0;
    let range = new vscode.Range(new vscode.Position(position.line,startCharacterPos), position);
    while(startCharacterPos<position.character && !RegExp('^[0-9]*$','gm').test(document.getText(range))) {
      startCharacterPos++;
      range = new vscode.Range(new vscode.Position(position.line,startCharacterPos), position);
    }
    ranges.push(range);
  });
  return ranges;
}
//function getRangesOfDigitsRight() is not declared, since vscode already has the .getWordRangeAtPosition() method

//logs the line numbers into the given ranges
function replaceNumbers(activeTextEditor, ranges){
  activeTextEditor.edit(editBuilder=>{
    ranges.forEach(range=>{
      editBuilder.replace(range, (range.start.line+1).toString());
    });
  });
}

// deletes anything inside the given ranges
function deleteRanges(activeTextEditor, ranges){
  activeTextEditor.edit(editBuilder=>{
    ranges.forEach(range=>{
      editBuilder.delete(range);
    });
  });
}




function activate(context) {
  // The following line of code will only be executed once when your extension is activated
  // none

  //line-logger LOGs line numbers to the LEFT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.log-left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = tokenStartPositions(document, standardTokens);
    positions.push(...tokenStartPositions(document, leftTokens));
    let ranges = getRangesOfDigitsLeft(document, positions);    
    replaceNumbers(activeTextEditor, ranges);
    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger logged ${positions.length} lines to your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
	  })
  );




  //line-logger LOGs line numbers to the RIGHT side of the tokens
	context.subscriptions.push(vscode.commands.registerCommand('line-logger.log-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = tokenEndPositions(document, standardTokens);
    positions.push(...tokenStartPositions(document, rightTokens));
    activeTextEditor.edit(editBuilder=>{
      positions.forEach(position=>{
        editBuilder.replace(document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position), `${position.line+1}`);
      });
    });
    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger logged ${positions.length} lines to your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
  }));




  //line-logger DELETEs adjacent line numbers on the LEFT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.delete-left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = tokenStartPositions(document, standardTokens);
    positions.push(...tokenStartPositions(document, leftTokens));
    let ranges = getRangesOfDigitsLeft(document, positions);    
    deleteRanges(activeTextEditor, ranges);
    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger deleted ${positions.length} line numbers from your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
  }));




  //line-logger DELETEs adjacent line numbers on the RIGHT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.delete-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = tokenEndPositions(document, standardTokens);
    positions.push(...tokenStartPositions(document, rightTokens))
    activeTextEditor.edit(editBuilder=>{
      positions.forEach(position=>{
        editBuilder.delete(document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position));
      });
    });
    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger deleted ${positions.length} line numbers from your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
  }));




  //ERASEs all line-logger TOKENS in the file
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.erase-tokens', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let ranges = [];
    standardTokens.forEach(regex=>{
      let match;
      let text = document.getText(); //must be reloaded for every loop
      while ((match = regex.exec(text)) !== null) {
        ranges.push(new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)));
      }
    });
    deleteRanges(activeTextEditor);
		let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger erased ${ranges.length} tokens from your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
	}));
}


function deactivate() {}


module.exports = {
	activate,
	deactivate
}
