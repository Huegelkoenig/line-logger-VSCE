# line-logger README

Make debugging faster with this extension for Visual Studio Code which logs the line numbers next to specific tokens.<br><br>
![demo.gif](./graphics/demo.gif)<br>

## Content
[Supported Languages](#supported-languages)<br>
[Installation](#installation)<br>
[How It Works](#how-it-works)<br>
&nbsp;&nbsp;&nbsp;&nbsp;- [Tokens](#tokens)<br>
&nbsp;&nbsp;&nbsp;&nbsp;- [Line Numbers](#line-numbers)<br>
&nbsp;&nbsp;&nbsp;&nbsp;- [Commands](#commands)<br>
&nbsp;&nbsp;&nbsp;&nbsp;- [Things to keep in mind](#things-to-keep-in-mind)<br>
[Keybindings](#keybindings)<br>
[Known Issues](#known-issues)<br>
[Release Notes](#release-notes)<br>


## Supported Languages
The line-logger extension works with any programming language that allows multiline comments in one of the following formats:<br>
> `/* */`&nbsp;&nbsp;,&nbsp;&nbsp;`<!--  -->`&nbsp;&nbsp;,&nbsp;&nbsp;`(* *)`&nbsp;&nbsp;,&nbsp;&nbsp;`<# #>`&nbsp;&nbsp;,&nbsp;&nbsp;`{- -}`&nbsp;&nbsp;,&nbsp;&nbsp;`\* *\`&nbsp;&nbsp;,&nbsp;&nbsp;`%{ %}`&nbsp;&nbsp;or&nbsp;&nbsp;`--[[ ]]`<br>

This includes Java, Javascript, C, C++, C#, HTML, PHP, Matlab, ColdFusion, AppleScript, Pascal, PowerShell, D, Swift, Haskell, Lua, OCaml and more.<br>

![example.png](./graphics/example.png)<br>

## Installation
Just install this extension from the VS Code marketplace. Afterwards you may get prompted to restart VS Code. That's it.

## How It Works
You can place line-logger tokens anywhere in your code. Upon calling a log command (see [Commands](###commands)) from the Command Palette, this extension searches for the line-logger tokens in your code and hardcodes the corresponding line numbers right in front of (or right behind) the tokens. Existing line numbers will be updated during this process.<br>
Optionally there will be a space added between the token and the line number.<br> 
There are also commands which let you automatically delete existing line numbers or erase all line-logger tokens from your code.

### Tokens
A line-logger token is basically just a multiline comment with nothing but `LL` in it.<br>
In e.g. Java, C or JavaScript a multiline comment is represented by the opening tag `/*` and the closing tag `*/` , hence a line-logger token would look like this: `/*LL*/` .<br>
In general, you can place line-logger tokens anywhere in your code. However, this extension doesn't check if your code is still correct, neither after you placed your tokens, nor after the line numbers are written, updated or deleted from your code. It's up to you to take care that the tokens are placed in a way so that the syntax of your code is still correct.<br>
![token-placement.png](./graphics/token-placement.png)

### Line numbers
Any sequence of digits directly adjacent to a line-logger token is treated as a line number.
Depending on your own preferences, line numbers can be stored on the left or on the right side of the tokens (see [Commands](###commands) below).
Line numbers start/end at the next non digit character before/after the line-logger tokens, including spaces and line breaks.<br>
Optionally, a single space between a line-logger token and the corresponding line number will be allowed.
If you switch between any of those styles, it's advisable to delete the line numbers first (see [Commands](###commands) below) or you will probably end up with invalid code.<br>
![left-right-both.png](./graphics/left-right-both.png)

### Commands
Hit CTRL + SHIFT + P to open the Command Palette and enter one of the commands below.<br>
Since the Command Palette uses a built in search function, you can simplify these commands by entering any parts of the words appearing in the commands, as long as they are in the same order. Because of this, you can e.g. just enter `>line-logger` and select one of the appearing commands, use the suggested short forms or make up your own short forms which don't collide with your other installed expansions.

>`>log line numbers to the left of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>log left` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>logle`)<br>
The line numbers will be written in front of the tokens. Already existing line numbers in front of the tokens will be updated. Line numbers behind the tokens won't be changed.

>`>log line numbers to the right of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>log right` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>logri`)<br>
The line numbers will be written behind the tokens. Already existing line numbers behind the tokens will be updated. Line numbers in front of the tokens won't be changed.

>`>delete line numbers adjacent to the left of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>delete left` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>dle`)<br>
May existing line numbers in front of the tokens will be deleted.

>`>delete line numbers adjacent to the right of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>delete right` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>dr`)<br>
May existing line numbers behind the tokens will be deleted.

>`>erase all line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>erase tokens` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>erto`)<br>
All line-logger tokens will be deleted from your file. This helps you to clean your code if you don't need the tokens anymore. You may want to run `>delete left` and/or `>delete right` first.

If you instead use the following commands, a single space will be added (and assumed!) between the line-logger token and the corresponding line number.<br>

>`>log line numbers with a space to the left of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>log space left` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>logsple`)<br>
The line numbers will be written along with a space in front of the tokens. Already existing line numbers + space in front of the tokens will be updated. Line numbers behind the tokens won't be changed. Spaces without line numbers will be ignored.

>`>log space and line numbers to the right of the line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>log space right` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>logspri`)<br>
The line numbers will be written along with a space behind the tokens. Already existing spaces + line numbers behind the tokens will be updated. Line numbers in front of the tokens won't be changed. Spaces without line numbers will be ignored.

>`>delete line numbers and spaces to the left of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>delete space left` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>dsple`)<br>
May existing line numbers and space in front of the tokens will be deleted. Spaces without line numbers won't be deleted.

>`>delete spaces and line numbers to the right of line-logger tokens`  &nbsp;&nbsp;&nbsp;&nbsp;(suggested short form: `>delete space right` &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp; `>dspr`)<br>
May existing space + line numbers behind the tokens will be deleted. Spaces without line numbers won't be deleted.

### Things to keep in mind
- Any of these commands alters your code, meaning the line numbers will be hardcoded into (or deleted from) your code.<br>
- You can always add new tokens. Just run a log command again.<br>
- You can always delete unwanted tokens manually. Don't forget to delete the corrosponding line number, too, if you don't want to keep it.<br>
- Whenever you add or delete lines of code, some tokens may move to another line. Line numbers next to the tokens aren't updated until you run the log command again.<br>
- `>log left` updates numbers in front of the tokens, but doesnt alter numbers behind of the tokens. Vice versa for `>log right`. So if you change the prefered style from `>log left` to `>log right` (or vice versa), don't forget to run `>delete left` (or `>delete right`) once, or you'll probably end up with some errors.<br>
- Try not to mix the commands for tokens without spaces and tokens with spaces, or you'll probably end up with a mess.
- If you accidently run `>erase tokens`, you can Edit-->Undo (CTRL + Z) .<br>
- You can always Edit-->Undo (CTRL + Z) the last step.<br>

## Keybindings
There aren't any [keybindings](https://code.visualstudio.com/docs/getstarted/keybindings) implemented, but you can set your own bindings  via &nbsp;&nbsp; File --> Preferences --> Keyboard Shortcuts &nbsp;&nbsp; and entering 'line-logger' into the search bar.<br>
Choose the commands of your choice and assign them the bindings you'd like.<br>
See also [https://code.visualstudio.com/docs/getstarted/keybindings#_detecting-keybinding-conflicts](https://code.visualstudio.com/docs/getstarted/keybindings#_detecting-keybinding-conflicts) on how to avoid keybinding conflicts.

## Known Issues
see [https://www.github.com/Huegelkoenig/line-logger-VSCE/issues](https://www.github.com/Huegelkoenig/line-logger-VSCE/issues)

## Release Notes 
see [https://www.github.com/Huegelkoenig/line-logger-VSCE/blob/master/CHANGELOG.md](https://www.github.com/Huegelkoenig/line-logger-VSCE/blob/master/CHANGELOG.md)
