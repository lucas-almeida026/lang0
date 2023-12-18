@{%
const tokenizer = require('./tokenizer')
%}

@lexer tokenizer

program
  -> literal {% id %}
  | term_expression {% id %}
  | factor_expression {% id %}
  | unary_expression {% id %}

literal
  -> %int {% id %}
  | %float {% id %}
  | %string {% id %}
  | %char {% id %}
  | %bool {% id %}


term_operator
  -> %plus {% id %}
  | %dash {% id %}

factor_operator
  -> %star {% id %}
  | %slash {% id %}

unary_operator
  -> %bang {% id %}
  | %dash {% id %}

term_expression
  -> literal __ term_operator __ literal {% data => ({
    type: 'binary_expression',
    operator: data[2],
    left: data[0],
    right: data[4],
  }) %}

factor_expression
  -> literal __ factor_operator __ literal {% data => ({
    type: 'binary_expression',
    operator: data[2],
    left: data[0],
    right: data[4],
  }) %}

unary_expression
  -> unary_operator literal {% data => ({
    type: 'unary_expression',
    operator: data[0],
    argument: data[1],
  }) %}


_ -> %WS:* {% id %}
__ -> %WS:+ {% id %}