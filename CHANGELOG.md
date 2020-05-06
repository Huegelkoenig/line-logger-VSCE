# Change Log

All notable changes to the "line-logger" extension will be documented in this file.


## [Unreleased]
 - add flagged tokens /*LL:L*/ and /*LL:R*/, so you can individually decide wether the line numbers shall be logged in front or behind the tokens.
   Already implemented, but somehow i don't like it, so it's unreleased. See branch LR.
 - 

## [0.3.4] - 2020-05-06
  - added pictures to README.md
  - fixed some more typos
  - updated package.json with author, license, repo, etc 

## [0.3.3] - 2020-05-05
  - fixed some typos

## [0.3.0] - 2020-05-04
  - added an ico

## [0.2.1] - 2020-05-02
  - added README.md

## [0.2.0] - 2020-05-02
  - added functions 'delete-left()' and 'delete-right()' to delete the line number adjecent to the line-logger tokens
  - added a function 'erase()' to erase all line-logger tokens in a file

## [0.1.1] - 2020-05-02
  - adjusted dependencies in package.json
  - cleaned extension.js of unnecessary code, empty lines, etc

## [0.1.0] - 2020-05-01
 - Initial commit containing the functions 'line-logger' and 'line-logger-right'