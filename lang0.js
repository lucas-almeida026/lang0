// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const tokenizer = require('./tokenizer')
var grammar = {
    Lexer: tokenizer,
    ParserRules: [
    {"name": "program", "symbols": ["literal"], "postprocess": id},
    {"name": "program", "symbols": ["term_expression"], "postprocess": id},
    {"name": "program", "symbols": ["factor_expression"], "postprocess": id},
    {"name": "program", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("int") ? {type: "int"} : int)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("char") ? {type: "char"} : char)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "term_operator", "symbols": [(tokenizer.has("plus") ? {type: "plus"} : plus)], "postprocess": id},
    {"name": "term_operator", "symbols": [(tokenizer.has("dash") ? {type: "dash"} : dash)], "postprocess": id},
    {"name": "factor_operator", "symbols": [(tokenizer.has("star") ? {type: "star"} : star)], "postprocess": id},
    {"name": "factor_operator", "symbols": [(tokenizer.has("slash") ? {type: "slash"} : slash)], "postprocess": id},
    {"name": "unary_operator", "symbols": [(tokenizer.has("bang") ? {type: "bang"} : bang)], "postprocess": id},
    {"name": "unary_operator", "symbols": [(tokenizer.has("dash") ? {type: "dash"} : dash)], "postprocess": id},
    {"name": "term_expression", "symbols": ["literal", "__", "term_operator", "__", "literal"], "postprocess":  data => ({
          type: 'binary_expression',
          operator: data[2],
          left: data[0],
          right: data[4],
        }) },
    {"name": "factor_expression", "symbols": ["literal", "__", "factor_operator", "__", "literal"], "postprocess":  data => ({
          type: 'binary_expression',
          operator: data[2],
          left: data[0],
          right: data[4],
        }) },
    {"name": "unary_expression", "symbols": ["unary_operator", "literal"], "postprocess":  data => ({
          type: 'unary_expression',
          operator: data[0],
          argument: data[1],
        }) },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (tokenizer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": id},
    {"name": "__$ebnf$1", "symbols": [(tokenizer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (tokenizer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": id}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
