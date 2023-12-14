@{%
const tokenizer = require('./tokenizer')
%}

@lexer tokenizer

program -> literal {% id %}

literal
  -> %int {% id %}
  | %float {% id %}
  | %string {% id %}
  | %char {% id %}
  | %bool {% id %}