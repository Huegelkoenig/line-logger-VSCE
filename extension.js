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

//gets the ranges of the numbers adjacent to the right side of the tokens
function getRangesOfDigitsToTheRight(document, positions){
  let ranges = [];
  positions.forEach(position=>{
    ranges.push(document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position));
  })
  return ranges;
}


function spliceOverlappingRanges(ranges){
  ranges.sort((range1, range2)=>{ return (range1.start.line == range2.start.line) ? range1.start.character - range2.start.character : range1.start.line - range2.start.line;});
  let i=0;
  while (i<ranges.length-1){
    if (ranges[i].end.line==ranges[i+1].start.line && ranges[i].end.character>=ranges[i+1].start.character){
      ranges.splice(i+1,1);
    }
    else{
      i++;
    }
  }
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
    let positions = getStartPositionsOfTokens(document, standardTokens);  //positions 
    positions.push(...getStartPositionsOfTokens(document, leftTokens));   //   and ranges for standard tokens and "left"-tagged tokens
    let ranges = getRangesOfDigitsToTheLeft(document, positions);
    positions = getEndPositionsOfTokens(document, rightTokens);           //positions 
    ranges.push(...getRangesOfDigitsToTheRight(document,positions));      //   and ranges for "right"-tagged tokens
    spliceOverlappingRanges(ranges);
    replaceDigits(activeTextEditor, ranges);
    showMessage(`line-logger logged ${ranges.length} lines to your file`);
	  })
  );

  //line-logger DELETEs adjacent line numbers on the LEFT side of the tokens
  context.subscriptions.push(vscode.commands.registerCommand('line-logger.delete-left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = getStartPositionsOfTokens(document, standardTokens);  //positions for standard tokens,
    positions.push(...getStartPositionsOfTokens(document, leftTokens));   //   "left"-tagged tokens
    positions.push(...getStartPositionsOfTokens(document, rightTokens));  //   and "right"-tagged tokens
    let ranges = getRangesOfDigitsToTheLeft(document, positions);         
    deleteRanges(activeTextEditor, ranges);
    showMessage(`line-logger deleted up to ${ranges.length} line numbers from your file`);
  }));



  //line-logger LOGs line numbers to the RIGHT side of the tokens
	context.subscriptions.push(vscode.commands.registerCommand('line-logger.log-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    let positions = getStartPositionsOfTokens(document, leftTokens);  //positions and ranges of "left"-tagged tokens
    let ranges = getRangesOfDigitsToTheLeft(document, positions);
    positions = getEndPositionsOfTokens(document, standardTokens);    //positions and ranges of standard and "right"-tagged tokens
    positions.push(...getEndPositionsOfTokens(document, rightTokens));
    ranges.push(...getRangesOfDigitsToTheRight(document, positions));  
    spliceOverlappingRanges(ranges);
    replaceDigits(activeTextEditor, ranges);
    showMessage(`line-logger logged ${ranges.length} lines to your file`);
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
    showMessage(`line-logger deleted up to ${positions.length} line numbers from your file`);
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
