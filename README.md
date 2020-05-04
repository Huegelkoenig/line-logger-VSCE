# line-logger README

An extension for Visual Studio Code which logs the line numbers next to specific tokens, so you can e.g. debug your code more efficiently.

![demo.gif](https://www.github.com/Huegelkoenig/line-logger-VSCE/docs/demo.gif)

## Supported languages
The line-logger extension works with any programming language that allows multiline comments in one of the following formats:<br>
> `/* */`&nbsp;&nbsp;,&nbsp;&nbsp;`<!--  -->`&nbsp;&nbsp;,&nbsp;&nbsp;`(* *)`&nbsp;&nbsp;,&nbsp;&nbsp;`<# #>`&nbsp;&nbsp;,&nbsp;&nbsp;`\* *\`&nbsp;&nbsp;,&nbsp;&nbsp;`%{ %}`&nbsp;&nbsp;or&nbsp;&nbsp;`--[[ ]]`<br>

This includes Java, Javascript, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, Swift, Haskell, Lua, OCaml, and more

## Installation
Just install this extension from the VS Code marketplace. Afterwards you may need to restart VS Code. That's it.

## How it works
### Tokens
A line-logger token is basically just a multiline comment with nothing but `LL` in it.<br>
E.g. in Java, C or Javascript a multiline comment is represented by the opening tags `/*` and the closing tags `*/`. Hence a line-logger token would look like this: `/*LL*/` .<br>
In general, you can put line-logger tokens anywhere in your code, but in order for your code to work, you must of course take care that the syntax of your code is still correct.<br>
With one or more tokens in place you can then run one of the line-logger [commands](#commands) below.<br>

### Commands
Hit CTRL + SHIFT + P to open the Command Palette and enter one of the following commands.<br>
Since the Command Palette uses a built in search function, you can search for the commands by entering in correct order any words appearing in the commands. Because of this, you can e.g. just enter `>line-logger` and select one of the appearign commands, use the suggested short form or make up your own short form.

>`>log line numbers to the left of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>log left`\)<br>
The line numbers will be written to the left of the tokens. If there is already a number on the left side of a token, the number will be updated.

>`>log line numbers to the right of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>log right`\)<br>
The line numbers will be written to the right of the tokens. If there is already a number on the right side of a token, the number will be updated.

>`>delete line numbers adjacent on the left of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>delete left`\)<br>
The line numbers on the left side of the tokens will be deleted.

>`>delete line numbers adjacent on the right of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>delete right`\)<br>
The line numbers on the right side of the tokens will be deleted.

>`>erase all line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>erase tokens`\)<br>
All line-logger tokens will be deleted from your file.

### Things to keep in mind
- Any of these commands alters your code, meaning the line numbers will be hardcoded into (or deleted from) your code.<br>
- If you want line-logger to log the numbers to be written to the left \(`log left`\) or to the right \(`log right`\) of the tokens is up to you. Since the tokens are basicly just comments, they will be ignored while running/compiling your code, so the output should be the same.<br>
- `log left` updates numbers to the left of the tokens, but doesnt alter numbers to the right of the tokens. Vice versa for `log right`. So if you change your personal preference from `log left` to `log right` \(or vice versa\), don't forget to run `delete-left` \(or `delete-right`\) once.<br>
- Whenever you add or delete lines, some tokens may have moved to another line number but the numbers next to the tokens aren't updated until you run the command again.<br>
- Only the numbers right next to the tokens will be altered. If there is any non-digit symbol, including spaces and linebreaks, right next to the token, line-logger will treat the token as an unset/new token. So don't write any spaces manually between your tokens and your line numbers.<br>
- A token inside a literal will be treated like any other token, but on runtime not only the page number, but the token itself will be printed to your screen. <br>
- You can always add new tokens. Just run `log left` again.<br>
- You can always delete unwanted tokens. Don't forget to delete the corrosponding line number, too, if you don't want to keep it.<br>
- If you accidently run `erase tokens`, you can always Edit -> Undo \(CTRL + z\) the last step.

## Keybindings
There aren't any [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings) implemented, but you can set your own binding  via &nbsp;&nbsp; File --> Preferences --> Keyboard Shortcuts &nbsp;&nbsp; and entering 'line-logger' into the search bar.<br>
Choose the commands of your choice and assign them the bindings you'd like.<br>
See also [https://code.visualstudio.com/docs/getstarted/keybindings#_detecting-keybinding-conflicts](https://code.visualstudio.com/docs/getstarted/keybindings) on how to avoid keybinding conflicts.

## Known Issues
none

## Release Notes 
see CHANGELOG.md

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

