// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const tokenizer = require('./tokenizer')

function binary_expression(data) {
  return {
    type: 'binary_expression',
    operator: data[2],
    left: data[0],
    right: data[4]
  }
}
var grammar = {
    Lexer: tokenizer,
    ParserRules: [
    {"name": "program", "symbols": ["logical_or_expression"], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("int") ? {type: "int"} : int)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("char") ? {type: "char"} : char)], "postprocess": id},
    {"name": "literal", "symbols": [(tokenizer.has("bool") ? {type: "bool"} : bool)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(tokenizer.has("gt") ? {type: "gt"} : gt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(tokenizer.has("gte") ? {type: "gte"} : gte)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(tokenizer.has("lt") ? {type: "lt"} : lt)], "postprocess": id},
    {"name": "comparison_operator", "symbols": [(tokenizer.has("lte") ? {type: "lte"} : lte)], "postprocess": id},
    {"name": "equality_operator", "symbols": [(tokenizer.has("eqeq") ? {type: "eqeq"} : eqeq)], "postprocess": id},
    {"name": "equality_operator", "symbols": [(tokenizer.has("neq") ? {type: "neq"} : neq)], "postprocess": id},
    {"name": "term_operator", "symbols": [(tokenizer.has("plus") ? {type: "plus"} : plus)], "postprocess": id},
    {"name": "term_operator", "symbols": [(tokenizer.has("dash") ? {type: "dash"} : dash)], "postprocess": id},
    {"name": "factor_operator", "symbols": [(tokenizer.has("star") ? {type: "star"} : star)], "postprocess": id},
    {"name": "factor_operator", "symbols": [(tokenizer.has("slash") ? {type: "slash"} : slash)], "postprocess": id},
    {"name": "unary_operator", "symbols": [(tokenizer.has("bang") ? {type: "bang"} : bang)], "postprocess": id},
    {"name": "unary_operator", "symbols": [(tokenizer.has("dash") ? {type: "dash"} : dash)], "postprocess": id},
    {"name": "primary_expression", "symbols": ["literal"], "postprocess": id},
    {"name": "primary_expression", "symbols": [(tokenizer.has("lparen") ? {type: "lparen"} : lparen), "term_expression", (tokenizer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess":  data => ({
          type: 'parenthesized_expression',
          expression: data[1],
        }) },
    {"name": "unary_expression", "symbols": ["primary_expression"], "postprocess": id},
    {"name": "unary_expression", "symbols": ["unary_operator", "primary_expression"], "postprocess":  data => ({
          type: 'unary_expression',
          operator: data[0],
          argument: data[1],
        }) },
    {"name": "factor_expression", "symbols": ["unary_expression"], "postprocess": id},
    {"name": "factor_expression", "symbols": ["factor_expression", "__", "factor_operator", "__", "factor_expression"], "postprocess": binary_expression},
    {"name": "term_expression", "symbols": ["factor_expression"], "postprocess": id},
    {"name": "term_expression", "symbols": ["term_expression", "__", "term_operator", "__", "term_expression"], "postprocess": binary_expression},
    {"name": "comparison_expression", "symbols": ["term_expression"], "postprocess": id},
    {"name": "comparison_expression", "symbols": ["comparison_expression", "__", "comparison_operator", "__", "comparison_expression"], "postprocess": binary_expression},
    {"name": "equality_expression", "symbols": ["comparison_expression"], "postprocess": id},
    {"name": "equality_expression", "symbols": ["equality_expression", "__", "equality_operator", "__", "equality_expression"], "postprocess": binary_expression},
    {"name": "bitwise_and_expression", "symbols": ["equality_expression"], "postprocess": id},
    {"name": "bitwise_and_expression", "symbols": ["bitwise_and_expression", "__", (tokenizer.has("and") ? {type: "and"} : and), "__", "equality_expression"], "postprocess": binary_expression},
    {"name": "bitwise_xor_expression", "symbols": ["bitwise_and_expression"], "postprocess": id},
    {"name": "bitwise_xor_expression", "symbols": ["bitwise_xor_expression", "__", (tokenizer.has("caret") ? {type: "caret"} : caret), "__", "bitwise_and_expression"], "postprocess": binary_expression},
    {"name": "bitwise_or_expression", "symbols": ["bitwise_xor_expression"], "postprocess": id},
    {"name": "bitwise_or_expression", "symbols": ["bitwise_or_expression", "__", (tokenizer.has("or") ? {type: "or"} : or), "__", "bitwise_xor_expression"], "postprocess": binary_expression},
    {"name": "logical_and_expression", "symbols": ["bitwise_or_expression"], "postprocess": id},
    {"name": "logical_and_expression", "symbols": ["logical_and_expression", "__", (tokenizer.has("lor") ? {type: "lor"} : lor), "__", "bitwise_or_expression"], "postprocess": binary_expression},
    {"name": "logical_or_expression", "symbols": ["logical_and_expression"], "postprocess": id},
    {"name": "logical_or_expression", "symbols": ["logical_or_expression", "__", (tokenizer.has("land") ? {type: "land"} : land), "__", "logical_and_expression"], "postprocess": binary_expression},
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
