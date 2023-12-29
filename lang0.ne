@{%
const tokenizer = require('./tokenizer')

function binary_expression([head, ...tail]) {
  if (head && tail && Array.isArray(tail) && tail.length === 1 && Array.isArray(tail[0]) && tail[0].length === 0) {
    return head
  }
  let left = head  
  for (const sub of tail[0]) {
    let [,op, ,right] = sub
    let temp = {
      type: 'binary_expression',
      operator: op,
      left,
      right
    }
    left = temp
  }
  
  return left
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
  | %lparen logical_or_expression %rparen {% data => ({
    type: 'parenthesized_expression',
    expression: data[1],
  }) %}

unary_expression
  -> primary_expression {% id %}
  | unary_operator unary_expression {% data => ({
    type: 'unary_expression',
    operator: data[0],
    argument: data[1],
  }) %}

factor_expression
  -> unary_expression (__ factor_operator __ unary_expression):* {% binary_expression %}

term_expression
  -> factor_expression (__ term_operator __ factor_expression):* {% binary_expression %}

comparison_expression
  -> term_expression (__ comparison_operator __ term_expression):* {% binary_expression %}

equality_expression
  -> comparison_expression (__ equality_operator __ comparison_expression):* {% binary_expression %}

# bitwise start
bitwise_and_expression
  -> equality_expression (__ %and __ equality_expression):* {% binary_expression %}

bitwise_xor_expression
  -> bitwise_and_expression (__ %caret __ bitwise_and_expression):* {% binary_expression %}

bitwise_or_expression
  -> bitwise_xor_expression (__ %or __ bitwise_xor_expression):* {% binary_expression %}
# bitwise end

# logical start
logical_and_expression
  -> bitwise_or_expression (__ %lor __ bitwise_or_expression):* {% binary_expression %}

logical_or_expression
  -> logical_and_expression (__ %land __ logical_and_expression):* {% binary_expression %}
# logical end

_ -> %WS:* {% id %}
__ -> %WS:+ {% id %}