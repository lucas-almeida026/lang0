@{%
const tokenizer = require('./tokenizer')

function binary_expression(data) {
  return {
    type: 'binary_expression',
    operator: data[2],
    left: data[0],
    right: data[4]
  }
}
%}

@lexer tokenizer

program
  -> logical_or_expression {% id %}

literal
  -> %int {% id %}
  | %float {% id %}
  | %string {% id %}
  | %char {% id %}
  | %bool {% id %}

comparison_operator
  -> %gt {% id %}
  | %gte {% id %}
  | %lt {% id %}
  | %lte {% id %}

equality_operator
  -> %eqeq {% id %}
  | %neq {% id %}

term_operator
  -> %plus {% id %}
  | %dash {% id %}

factor_operator
  -> %star {% id %}
  | %slash {% id %}

unary_operator
  -> %bang {% id %}
  | %dash {% id %}

primary_expression
  -> literal {% id %}
  | %lparen term_expression %rparen {% data => ({
    type: 'parenthesized_expression',
    expression: data[1],
  }) %}

unary_expression
  -> primary_expression {% id %}
  | unary_operator primary_expression {% data => ({
    type: 'unary_expression',
    operator: data[0],
    argument: data[1],
  }) %}

factor_expression
  -> unary_expression {% id %}
  | factor_expression __ factor_operator __ factor_expression {% binary_expression %}

term_expression
  -> factor_expression {% id %}
  | term_expression __ term_operator __ term_expression {% binary_expression %}

comparison_expression
  -> term_expression {% id %}
  | comparison_expression __ comparison_operator __ comparison_expression {% binary_expression %}

equality_expression
  -> comparison_expression {% id %}
  | equality_expression __ equality_operator __ equality_expression {% binary_expression %}

# bitwise start
bitwise_and_expression
  -> equality_expression {% id %}
  | bitwise_and_expression __ %and __ equality_expression {% binary_expression %}

bitwise_xor_expression
  -> bitwise_and_expression {% id %}
  | bitwise_xor_expression __ %caret __ bitwise_and_expression {% binary_expression %}

bitwise_or_expression
  -> bitwise_xor_expression {% id %}
  | bitwise_or_expression __ %or __ bitwise_xor_expression {% binary_expression %}
# bitwise end

# logical start
logical_and_expression
  -> bitwise_or_expression {% id %}
  | logical_and_expression __ %lor __ bitwise_or_expression {% binary_expression %}

logical_or_expression
  -> logical_and_expression {% id %}
  | logical_or_expression __ %land __ logical_and_expression {% binary_expression %}
# logical end

_ -> %WS:* {% id %}
__ -> %WS:+ {% id %}