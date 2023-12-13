const moo = require('moo')

const tokenizer = moo.compile({
  WS: /[ \t]+/,
  int: /0|[-+]?[1-9][0-9]*/,
  NL: { match: '\n', lineBreaks: true },
})

module.exports = tokenizer