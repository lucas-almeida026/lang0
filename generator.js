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
  const output = gen_program(ast);
  fs.writeFileSync('output.js', output);
} catch(e) {
  console.error(e?.message);
  process.exit(1);
}

function gen_program(ast) {
  const { type } = ast
  if (type === 'literal') {
    return gen_literal(ast)
  } else if (type === 'binary_expression') {
    return gen_binary_expression(ast)
  } else {
    console.log(`Invalid AST has type = ${type}`)
    return ''
  }
}

function gen_literal(node) {
  const { value } = node
  return value
}

function gen_binary_expression(node) {
  const { operator, left, right } = node
  return `${left.value} ${operator.value} ${right.value}`
}