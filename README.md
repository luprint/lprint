# luaprint README

LuaTurboPrint is a helper library for working with Lua. Often we don't want to use print statements, but there are many times they can help with debugging/quick checks. This is what this library is for.

It's very rough so may be a bit buggy!

## Features

`newPrintStatement`:

  a) if you have something highlighted (e.g. a variable) this will generate a print statement on the line below which will print the type, the value of the variable. It also includes the file name where the print statement is from.
x
  b) if you don't have any code highlighted, it will just put a new print statement with some randomly generated text on that line.

`newPrettyPrintStatement`:

   a) this will generate a prettyPrint function at the top of the file. This function will give you a readable version of a lua table.

   b) any variable you highlight when you run this command will be wrapped in this pretty print

   c) if you have nothing highlighted it behaves the same as `newPrintStatement`

`deletePrintStatements`: delete all print statements in a file - including the prettyPrint function.

`commentOutPrintStatements`: comment out all print statements in the file - including the prettyPrint function.

`uncommentPrintStatements`: uncomment all print statements in file - including the prettyPrint function.

### Future features

1) Options to choose what you want in your randomly generated text

2) A print sweeper option, which will delete all print messages which arn't commited yet.

3) Better quality prettyPrint

4) Print limit warnings

5) Jump to LTP print statement option

6) As with all projects, better testing.

7) Smoother cleanup of print statements

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.


## Contributing

## Setup


## Testing

The project has unit tests and e2e tests.

To run both: `npm run test`

To run just unit: `npm run unit`

To run just e2e: `npn run e2e`

*note* To fix, the cleanup function of the E2Es needs adding, so you'll see the e2e files are changed after the tests. So you'll need to reset them or your tests will fail.

To debug locally you can run run the dubugger, which will open a new vscode workspace with just the

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)


### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
