// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const tokenizer = require('./tokenizer')
var grammar = {
    Lexer: tokenizer,
    ParserRules: [
    {"name": "program", "symbols": [(tokenizer.has("int") ? {type: "int"} : int)], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
