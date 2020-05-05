const vscode = require('vscode');

//the following tokens support multi-line-comments in Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
const standardTokens = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
const leftTokens = [/\/\*LL:L\*\//g, /<!--LL:L-->/g, /\(\*LL:L\*\)/g, /<#LL:L#>/g, /{\*LL:L\*}/g, /%{LL:L%}/g, /--\[\[LL:L\]\]/g];
const rightTokens = [/\/\*LL:R\*\//g, /<!--LL:R-->/g, /\(\*LL:R\*\)/g, /<#LL:R#>/g, /{\*LL:R\*}/g, /%{LL:R%}/g, /--\[\[LL:R\]\]/g];

//gets the start positions of the tokens
function getStartPositionsOfTokens(document, regexArray){
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

//gets the end positions of the tokens
function getEndPositionsOfTokens(document, regexArray){
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
function getRangesOfDigitsToTheLeft(document, positions){
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

function getRangesOfDigitsToTheRight(document, positions){
  let ranges = [];
  positions.forEach(position=>{
    ranges.push(document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position));
  })
  return ranges;
}

//logs the line numbers into the given ranges
function replaceDigits(activeTextEditor, ranges){
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

function showMessage(msg){
  let statusBarMsg = vscode.window.setStatusBarMessage(msg);
  setTimeout(()=>{statusBarMsg.dispose()},3000);
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
    let positions = getStartPositionsOfTokens(document, standardTokens);//positions and ranges for standard and "left"-tagged tokens
    positions.push(...getStartPositionsOfTokens(document, leftTokens));
    let ranges = getRangesOfDigitsToTheLeft(document, positions);
    positions = getEndPositionsOfTokens(document, rightTokens); //positions and ranges for "right"-tagged tokens
    ranges.push(...getRangesOfDigitsToTheRight(document,positions));
    replaceDigits(activeTextEditor, ranges);
    showMessage(`line-logger logged ${positions.length} lines to your file`);
	  })
  );

  //line-logger DELETEs adjacent line numbers on the LEFT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.delete-left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = getStartPositionsOfTokens(document, standardTokens);
    positions.push(...getStartPositionsOfTokens(document, leftTokens));
    positions.push(...getStartPositionsOfTokens(document, rightTokens));
    let ranges = getRangesOfDigitsToTheLeft(document, positions);    
    deleteRanges(activeTextEditor, ranges);
    showMessage(`line-logger deleted ${positions.length} line numbers from your file`);
  }));



  //line-logger LOGs line numbers to the RIGHT side of the tokens
	context.subscriptions.push(vscode.commands.registerCommand('line-logger.log-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = getStartPositionsOfTokens(document, leftTokens);//positions and ranges of "left"-tagged tokens
    console.log('positions :>> ', positions);
    let ranges = getRangesOfDigitsToTheLeft(document, positions);
    console.log('ranges :>> ', ranges);
    positions = getEndPositionsOfTokens(document, standardTokens);//positions and ranges of standard and "right"-tagged tokens
    positions.push(...getEndPositionsOfTokens(document, rightTokens));
    ranges.push(...getRangesOfDigitsToTheRight(document, positions));
    console.log('ranges2 :>> ', ranges);
    console.log('ranges[0].start.line :>> ', ranges[0].start.line);
    replaceDigits(activeTextEditor, ranges);
    showMessage(`line-logger logged ${positions.length} lines to your file`);
  }));

  //line-logger DELETEs adjacent line numbers on the RIGHT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.delete-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = getEndPositionsOfTokens(document, standardTokens);
    positions.push(...getEndPositionsOfTokens(document, leftTokens))
    positions.push(...getEndPositionsOfTokens(document, rightTokens));
    activeTextEditor.edit(editBuilder=>{
      positions.forEach(position=>{
        editBuilder.delete(document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position));
      });
    });
    showMessage(`line-logger deleted ${positions.length} line numbers from your file`);
  }));



  //ERASEs all line-logger TOKENS in the file
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.erase-tokens', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let ranges = [];
    [...standardTokens,...leftTokens,...rightTokens].forEach(regex=>{
      let match;
      let text = document.getText(); //must be reloaded for every loop
      while ((match = regex.exec(text)) !== null) {
        ranges.push(new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)));
      }
    });
    deleteRanges(activeTextEditor,ranges);
		showMessage(`line-logger erased ${ranges.length} tokens from your file`);
	}));
}


function deactivate() {}


module.exports = {
	activate,
	deactivate
}
