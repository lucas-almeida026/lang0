const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const filepath = args[0];

if (!filepath) {
  console.error('Usage: node generator.js <filename>');
  process.exit(1);
}

if (!path.extname(filepath) === '.json') {
  console.error('Filename must have .json extension');
  process.exit(1);
}

try {
  const contents = fs.readFileSync(filepath, 'utf8');
  const ast = JSON.parse(contents);
  const output = gen_literal(ast);
  fs.writeFileSync('output.js', output);
} catch(e) {
  console.error(e?.message);
  process.exit(1);
}

function gen_literal(node) {
  const { value } = node
  return value
}