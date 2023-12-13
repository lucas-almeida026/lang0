@{%
const tokenizer = require('./tokenizer')
%}

@lexer tokenizer

program -> %int {% id %}