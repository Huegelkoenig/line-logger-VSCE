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
You can place line-logger tokens anywhere in your code. Upon calling a log command from your Command Palette, this extension searches your code for the line-logger tokens and hardcodes the corresponding line number right in front of (or right behin) the tokens into your code. 
### Tokens
A line-logger token is basically just a multiline comment with nothing but `LL` in it.<br>
In e.g. Java, C or Javascript a multiline comment is represented by the opening tags `/*` and the closing tags `*/`. Hence a line-logger token would look like this: `/*LL*/` .<br>
In general, you can place line-logger tokens anywhere in your code. However, this extension doesn't check if your code is still correct, neither after you placed your tokens, nor after the line numbers are written to (or deleted from) your code. It's up to you to take care that the tokens are placed in a way so that the syntax of your code is still correct.<br>

### Line numbers
The line-logger tokens treat any directly adjacent sequence of digits as a line-number. Line numbers will be updated on every call of a line-logger command.

### Commands
Hit CTRL + SHIFT + P to open the Command Palette and enter one of the commands below.<br>
Since the Command Palette uses a built in search function, you can simplify the commands by entering any words appearing in the commands in correct order. Because of this, you can e.g. just enter `>line-logger` and select one of the appearing commands, use the suggested short form or make up your own short form.

>`>log line numbers to the left of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>log left`\)<br>
The line numbers will be written in front of the tokens. Already existing line numbers in front of the tokens will be updated. Line numbers behind the tokens won't be changed.

>`>log line numbers to the right of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>log right`\)<br>
The line numbers will be written behind the tokens. Already existing line numbers behind the tokens will be updated. Line numbers in front of the tokens won't be changed.
>`>delete line numbers adjacent on the left of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>delete left`\)<br>
May existing line numbers in front of the tokens will be deleted.

>`>delete line numbers adjacent on the right of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>delete right`\)<br>
May existing line numbers behind the tokens will be deleted.

>`>erase all line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;\(suggested short form: `>erase tokens`\)<br>
All line-logger tokens will be deleted from your file. This helps you to clean your code if you dont' need the tokens anymore. You may want to run `>delete left` and/or `>delete right`first.

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
There aren't any [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings) implemented, but you can set your own bindings  via &nbsp;&nbsp; File --> Preferences --> Keyboard Shortcuts &nbsp;&nbsp; and entering 'line-logger' into the search bar.<br>
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

