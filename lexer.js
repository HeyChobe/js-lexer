import Lexer from "lex";

let currentRow = 0;
let currentColumn = 0;

const lexer = new Lexer(function (char) {
  throw new Error(
    "Unexpected character at currentRow " +
      currentRow +
      ", currentColumn " +
      currentColumn +
      ": " +
      char,
  );
});

const TOKENS = {
  OPERATORS: [],
  KEYWORDS: [],
  BLOCK_CHARS: [],
  CONSTANTS: [],
  STRINGS: [],
  COMMENTS: [],
  NUMBERS: [],
};

const IDENTIFIERS = [];

//Operators [+,-,*,/,=]
const EXP_PLUS = /\+/;
const EXP_MINUS = /\-/;
const EXP_EQUAL = /=/;

//Numbers [ints, floats]
const EXP_NUMBER = /\d+/;
const EXP_FLOAT = /[-]?\d*\.\d+([eE][-+]?\d+)?/;

//Reserved Word [if,while,int,return...]
const EXP_KEYWORDS =
  /(int|char|short|long|float|double|if|while|int|return|do|while|void)/;

//Control
const EXP_NEWLINE = /\n+/;
const EXP_SPACE = /\s+/;

//Indetifiers
const EXP_IDENTIFIER = /[a-zA-Z_][a-zA-Z0-9_]*/;

//Chars or words that begin and finish code blocks [{,}]
//Constants
//Strings ["..."]
//Comments [//...//, /*...*/]

function createElement(token, lexeme, value = undefined, ambit = undefined) {
  if (value === undefined || ambit === undefined)
    return { token, lexeme, currentRow, currentColumn };

  return { token, lexeme, value, ambit, currentRow, currentColumn };
}

function showResults() {
  console.log(
    "******************** Lexicographic Elements ********************\n",
  );
  console.log(TOKENS);
  console.log("\n");
  console.log("******************** Symbols Table ********************\n");
  console.log(IDENTIFIERS);
}

//RULES

lexer.addRule(EXP_PLUS, function (lexeme) {
  TOKENS.OPERATORS.push(createElement("PLUS", lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_MINUS, function (lexeme) {
  TOKENS.OPERATORS.push(createElement("MINUS", lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_EQUAL, function (lexeme) {
  TOKENS.OPERATORS.push(createElement("EQUAL", lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_KEYWORDS, function (lexeme) {
  TOKENS.KEYWORDS.push(createElement(lexeme.toUpperCase(), lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_IDENTIFIER, function (lexeme) {
  IDENTIFIERS.push(createElement("IDENTIFIER", lexeme, null, null));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_NUMBER, function (lexeme) {
  TOKENS.NUMBERS.push(createElement("NUMBER", lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_FLOAT, function (lexeme) {
  TOKENS.NUMBERS.push(createElement("FLOAT", lexeme));
  currentColumn += lexeme.length;
});

lexer.addRule(EXP_NEWLINE, function () {
  currentColumn = 0;
  currentRow++;
});

lexer.addRule(EXP_SPACE, function () {
  currentColumn++;
});

const main = () => {
  lexer.input = "int carlos = 10";
  lexer.lex();
  showResults();
};

main();
