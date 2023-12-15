const moo = require('moo')

const tokenizer = moo.compile({
  WS: /[ \t]+/,
  string: /"(?:\\["\\]|[^\n"\\])*"/,
  char: /'(?:[^'\\]|\\.)*'/,
  float: /[-+]?(?:\d+\.\d*|\.\d+)(?:[eE][-+]?\d+)?/,
  int: /0|[-+]?[1-9][0-9]*/,
  bool: /true|false/,
  plus: '+',
  dash: '-',
  star: '*',
  slash: '/',
  NL: { match: '\n', lineBreaks: true },
})

module.exports = tokenizer