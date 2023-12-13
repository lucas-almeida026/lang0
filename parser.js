const nearley = require('nearley')
const grammar = require('./lang0')
const fs = require('fs');

const args = process.argv.slice(2);
const filepath = args[0];

if (!filepath) {
  console.error('Usage: node parser.js <filename>');
  process.exit(1);
}

const file = fs.readFileSync(filepath, 'utf8');
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar))
parser.feed(file)

if (parser.results.length === 0) {
  console.log('Parsing error')
} else if (parser.results.length === 1) {
  const ast = parser.results[0];
  fs.writeFileSync('ast.json', JSON.stringify(ast, null, 2));
} else {
  console.log('Ambiguous grammar')
}
