// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const tokenizer = require('./tokenizer')
var grammar = {
    Lexer: tokenizer,
    ParserRules: [
    {"name": "program", "symbols": ["literal"], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("int") ? {type: "int"} : int)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("char") ? {type: "char"} : char)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("bool") ? {type: "bool"} : bool)], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
