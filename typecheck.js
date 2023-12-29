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

const TYPE_TREE = {
  number: ['int', 'float'],
  bool: ['true', 'false'],
  string: 'string',
  char: 'char',
}

const defs = {
  '+': [['number', 'number', 'number']],
  '-': [['number', 'number'], ['number', 'number', 'number']],
  '*': [['number', 'number', 'number']],
  '/': [['number', 'number', 'number']],
  '!': [['bool', 'bool']],
  '|': [['int', 'int', 'int']],
  '&': [['int', 'int', 'int']],
  '^': [['int', 'int', 'int']],
  '>': [['number', 'number', 'bool']],
  '<': [['number', 'number', 'bool']],
  '<=': [['number', 'number', 'bool']],
  '>=': [['number', 'number', 'bool']],
  '==': [['bool', 'bool', 'bool']],
  '!=': [['bool', 'bool', 'bool']],
  '||': [['bool', 'bool', 'bool']],
  '&&': [['bool', 'bool', 'bool']],
}

function is_type_related(typeA, typeB) {
  if (typeA === typeB) return true
  const defA = TYPE_TREE[typeA]
  const defB = TYPE_TREE[typeB]
  if (typeof defA === 'string' && typeof defB === 'string') {
    return defA === defB
  } else if (Array.isArray(defA) && !Array.isArray(defB)) {
    return defA.reduce((acc, type) => acc || is_type_related(type, typeB), false)
  } else if (!Array.isArray(defA) && Array.isArray(defB)) {
    return defB.reduce((acc, type) => acc || is_type_related(typeA, type), false)
  } else if (Array.isArray(defA) && Array.isArray(defB)) {
    return defA.reduce((acc, typeA) => acc || defB.reduce((acc, typeB) => acc || is_type_related(typeA, typeB), false), false)
  } else {
    return false
  }
}

try {
  const content = fs.readFileSync(filename, 'utf8');
  const ast = JSON.parse(content);
  console.log(check_program(ast));
} catch (e) {
  console.error(e?.message);
  process.exit(1);
}

function check_program(ast) {
  const { type } = ast
  if (check_literal(ast)) {
    return true
  } else if (type === 'binary_expression') {
    return check_binary_expression(ast)
  } else if (type === 'unary_expression') {
    return check_unary_expression(ast)
  } else if (type === 'parenthesized_expression') {
    const { expression } = ast
    return check_program(expression)
  } else {
    console.log(`Invalid AST has type = ${type}`)
    return false
  }
}

function is_node_of_type(node, type) {
  const { type: node_type } = node
  if (node_type === 'parenthesized_expression') {
    const { expression } = node
    return is_node_of_type(expression, type)
  } else if (node_type === 'unary_expression') {
    const { argument } = node
    return is_node_of_type(argument, type)
  } else if (node_type === 'binary_expression') {
    const { left, right } = node
    return is_node_of_type(left, type) || is_node_of_type(right, type)
  } else {
    return is_type_related(node_type, type)
  }
}

function check_binary_expression(node) {
  const { left, right, operator } = node
  const opDefs = defs[operator?.value]
  if (!opDefs) {
    console.error(`TypeError: Operator ${operator?.value} not defined`)
    return false
  }
  let usableDef = opDefs.length > 1 ? opDefs[1] : opDefs[0]
  const [arg0, arg1, ret] = usableDef
  if (!is_node_of_type(left, arg0)) {
    console.error(`TypeError: Expected ${arg0} but got ${left.type}`)
    return false
  }
  if (!is_node_of_type(right, arg1)) {
    console.error(`TypeError: Expected ${arg1} but got ${right.type}`)
    return false
  }
  return check_program(left) && check_program(right)
}


function check_unary_expression(node) {
  const { argument, operator } = node
  const opDefs = defs[operator?.value]
  if (!opDefs) {
    console.error(`TypeError: Operator ${operator?.value} not defined`)
    return false
  }
  let usableDef = opDefs.length > 1 ? opDefs[1] : opDefs[0]
  const [arg0, ret] = usableDef
  if (!is_node_of_type(argument, arg0)) {
    console.error(`TypeError: Expected ${arg0} but got ${argument.type}`)
    return false
  }
  return check_program(argument)
}

function check_number(node) {
  const { type } = node
  return check_int(node) || check_float(node)
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

module.exports.check_literal = check_literal