const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const filename = args[0];

if (!filename) {
  console.error('Usage: node typecheck.js <filename> [.json]');
  process.exit(1);
}

if (path.extname(filename) !== '.json') {
  console.error('Filename must have .json extension');
  process.exit(1);
}

try {
  const content = fs.readFileSync(filename, 'utf8');
  const ast = JSON.parse(content);
  console.log(check_literal(ast));
} catch(e) {
  console.error(e?.message);
  process.exit(1);
}

function check_int(node) {
  const { type } = node
  return type === 'int'
}

function check_float(node) {
  const { type } = node
  return type === 'float'
}

function check_char(node) {
  const { type } = node
  return type === 'char'
}

function check_string(node) {
  const { type } = node
  return type === 'string'
}

function check_bool(node) {
  const { type } = node
  return type === 'bool'
}

function check_literal(node) {
  return (
    check_int(node) ||
    check_float(node) ||
    check_char(node) ||
    check_string(node) ||
    check_bool(node)
  )
}