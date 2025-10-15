#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const colors = {
  green: (text) => `\u001b[32m${text}\u001b[0m`,
  red: (text) => `\u001b[31m${text}\u001b[0m`,
  cyan: (text) => `\u001b[36m${text}\u001b[0m`
};

const REQUIRED_FILES = [
  'index.html',
  'index.js',
  'records.js'
];

let failures = 0;

for (const file of REQUIRED_FILES) {
  try {
    readFileSync(join(process.cwd(), file), 'utf8');
    console.log(colors.green(`✓ Found ${file}`));
  } catch (err) {
    failures++;
    console.error(colors.red(`✗ Missing required file: ${file}`));
  }
}

if (failures > 0) {
  console.error(colors.red(`\nTest run failed with ${failures} missing file(s).`));
  process.exit(1);
}

console.log(colors.cyan('\nAll smoke checks passed.'));
