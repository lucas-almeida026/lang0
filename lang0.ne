@{%
const tokenizer = require('./tokenizer')
%}

@lexer tokenizer

program
  -> literal {% id %}
  | term_expression {% id %}

literal
  -> %int {% id %}
  | %float {% id %}
  | %string {% id %}
  | %char {% id %}
  | %bool {% id %}


term_operator
  -> %plus {% id %}
  | %dash {% id %}

term_expression
  -> literal __ term_operator __ literal {% data => ({
    type: 'binary_expression',
    operator: data[2],
    left: data[0],
    right: data[4],
  }) %}


_ -> %WS:* {% id %}
__ -> %WS:+ {% id %}