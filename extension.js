const vscode = require('vscode');

function activate(context) {
  // The following line of code will only be executed once when your extension is activated


  //line-logger logs line numbers to the left side of the tokens
  let disposable = vscode.commands.registerCommand('line-logger.line-logger', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g]; 
    let matches = [];
    allRegex.forEach(regex=>{    
      let match;
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

    activeTextEditor.edit(editBuilder=>{
      ranges.forEach(range=>{
        editBuilder.replace(range, `${range.start.line+1}`);
      });
    });
    
		vscode.window.showInformationMessage(`line-logger logged ${matches.length} lines to your file`);
	});
  context.subscriptions.push(disposable);



  //line-logger logs line numbers to the right side of the tokens
	disposable = vscode.commands.registerCommand('line-logger.line-logger-right', function () {
    let activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === undefined){
      return
    }
    let document = activeTextEditor.document;

    //the following tokens support Javascript, Java, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more
    let allRegex = [/\/\*LL\*\//g, /<!--LL-->/g, /\(\*LL\*\)/g, /<#LL#>/g, /{\*LL\*}/g, /%{LL%}/g, /--\[\[LL\]\]/g];
    let matches = [];
    allRegex.forEach(regex=>{
      let matchEnd;
      let text = document.getText(); //must be reloaded for every loop
      while ((matchEnd = regex.exec(text)) !== null) {
        matches.push(document.positionAt(matchEnd.index + matchEnd[0].length));
      }
    });

    activeTextEditor.edit(editBuilder=>{
      matches.forEach(match=>{
        let range = document.getWordRangeAtPosition(match,/\d+/) || new vscode.Range(match,match);
        editBuilder.replace(range, `${match.line+1}`);
      });
    });

		vscode.window.showInformationMessage(`line-logger logged ${matches.length} lines to your file`);
	});
  context.subscriptions.push(disposable);

}
exports.activate = activate;


function deactivate() {}


module.exports = {
	activate,
	deactivate
}
