const vscode = require('vscode');

function activate(context) {
  // The following line of code will only be executed once when your extension is activated
  // none


  //line-logger logs line numbers to the left side of the tokens
  let logLeft = vscode.commands.registerCommand('line-logger.left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support multi-line-comments in Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
    let positions = [];
    allRegex.forEach(regex=>{    
      let match;
      let text = document.getText(); //must be reloaded for every regex
      while ((match = regex.exec(text)) !== null) {
        positions.push(document.positionAt(match.index)); //position on the left side of the token
      }
    });

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
    
    activeTextEditor.edit(editBuilder=>{
      ranges.forEach(range=>{
        editBuilder.replace(range, `${range.start.line+1}`);
      });
    });
    
    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger logged ${positions.length} lines to your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
	});
  context.subscriptions.push(logLeft);




  //line-logger logs line numbers to the right side of the tokens
	let logRight = vscode.commands.registerCommand('line-logger.right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
    let positions = [];
    allRegex.forEach(regex=>{
      let match;
      let text = document.getText(); //must be reloaded for every regex
      while ((match = regex.exec(text)) !== null) {
        positions.push(document.positionAt(match.index + match[0].length)); //position of the right side of the token
      }
    });

    activeTextEditor.edit(editBuilder=>{
      positions.forEach(position=>{
        let range = document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position);
        editBuilder.replace(range, `${position.line+1}`);
      });
    });

    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger logged ${positions.length} lines to your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
	});
  context.subscriptions.push(logRight);




  //line-logger deletes adjacent line numbers on the left side of the tokens
  let deleteLeft = vscode.commands.registerCommand('line-logger.delete-left', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
    let positions = [];
    allRegex.forEach(regex=>{    
      let match;
      let text = document.getText(); //must be reloaded for every regex
      while ((match = regex.exec(text)) !== null) {
        positions.push(document.positionAt(match.index)); //position on the left side of the token
      }
    });
  
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

    activeTextEditor.edit(editBuilder=>{
      ranges.forEach(range=>{
        editBuilder.delete(range);
      });
    });

    let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger deleted ${positions.length} line numbers from your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
  });
  context.subscriptions.push(deleteLeft);




//line-logger logs line numbers to the right side of the tokens
  let deleteRight = vscode.commands.registerCommand('line-logger.delete-right', function () {
  let activeTextEditor = vscode.window.activeTextEditor;
  if (activeTextEditor === undefined){
    return
  }
  let document = activeTextEditor.document;

  //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
  let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
  let positions = [];
  allRegex.forEach(regex=>{
    let match;
    let text = document.getText(); //must be reloaded for every regex
    while ((match = regex.exec(text)) !== null) {
      positions.push(document.positionAt(match.index + match[0].length)); //position of the right side of the token
    }
  });

  activeTextEditor.edit(editBuilder=>{
    positions.forEach(position=>{
      let range = document.getWordRangeAtPosition(position,/\d+/) || new vscode.Range(position,position);
      editBuilder.delete(range);
    });
  });

  let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger deleted ${positions.length} line numbers from your file`);
  setTimeout(()=>{statusBarMsg.dispose()},3000);
});
context.subscriptions.push(deleteRight);




  //cleans the file of all line-logger tokens
  let erase = vscode.commands.registerCommand('line-logger.erase-tokens', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
    let ranges = [];
    allRegex.forEach(regex=>{
      let match;
      let text = document.getText(); //must be reloaded for every loop
      while ((match = regex.exec(text)) !== null) {
        ranges.push(new vscode.Range(document.positionAt(match.index), document.positionAt(match.index + match[0].length)));
      }
    });

    activeTextEditor.edit(editBuilder=>{
      ranges.forEach(range=>{
        editBuilder.delete(range);
      });
    });

		let statusBarMsg = vscode.window.setStatusBarMessage(`line-logger erased ${ranges.length} tokens from your file`);
    setTimeout(()=>{statusBarMsg.dispose()},3000);
	});
  context.subscriptions.push(erase);
}


function deactivate() {}


module.exports = {
	activate,
	deactivate
}
