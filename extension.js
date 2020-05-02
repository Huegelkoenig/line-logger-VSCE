const vscode = require('vscode');

function activate(context) {


	// This line of code will only be executed once when your extension is activated

  let disposable = vscode.commands.registerCommand('line-logger.line-logger', function () {
    // The code you place here will be executed every time your command is executed
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //line-logger supports Javascript, Java, C, C++, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml
    let AllRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g]; 


    let matches = [];
    let match;
    AllRegex.forEach(regex=>{    
      let text = document.getText(); //must be reloaded for every loop
      while ((match = regex.exec(text)) !== null) {
        matches.push(document.positionAt(match.index));
      }
    });
   
    let ranges = [];
    matches.forEach(match=>{
      let actStart = 0;
      let range = new vscode.Range(new vscode.Position(match.line,actStart), match);
      while(actStart<match.character && !RegExp('^[0-9]*$','gm').test(document.getText(range))) {
        actStart++;
        range = new vscode.Range(new vscode.Position(match.line,actStart), match);
      }
      ranges.push(range);
    });

    activeTextEditor.edit(editBuilder => {
      ranges.forEach(range=>{
        editBuilder.replace(range, `${range.start.line+1}`);
      });
    });
    
		vscode.window.showInformationMessage(`line-logger logged ${matches.length} lines to your file`);
	});
  context.subscriptions.push(disposable);




	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	disposable = vscode.commands.registerCommand('line-logger.line-logger-right', function () {
    // The code you place here will be executed every time your command is executed
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;
    

    let AllRegex = [/<!--LL-->/g, /\/\*LL\*\//g, /\(\*LL\*\)/g, /<!---LL--->/g]; 


    let matches = [];
    let match;
    let text;
    AllRegex.forEach(regex=>{    
      text = document.getText(); //must be reloaded for every loop
      while ((match = regex.exec(text)) !== null) {
        let endPos = document.positionAt(match.index + match[0].length);
        matches.push(endPos);
      }
    })
    let decimalsRange;
    activeTextEditor.edit(editBuilder => {
      matches.forEach(match=>{
        decimalsRange = document.getWordRangeAtPosition(match,/\d+/) || new vscode.Range(match,match);
        editBuilder.replace(decimalsRange, `${match.line+1}`);
      });
    });

    
		// Display a message box to the user
		vscode.window.showInformationMessage(`line-logger logged ${matches.length} lines to your file`);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
