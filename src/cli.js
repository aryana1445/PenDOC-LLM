#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { sanitize } = require('./sanitize');
const { config } = require('./config');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --input <file> --output <file>')
  .option('input', {
    alias: 'i',
    type: 'string',
    description: 'Path to the input .txt or .md file',
    demandOption: true,
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Path for the sanitized output file',
    demandOption: true,
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Print extra diagnostic information',
    default: false,
  })
  .help()
  .alias('help', 'h')
  .parse();

function run() {
  const inputPath = path.resolve(argv.input);
  const outputPath = path.resolve(argv.output);

  if (!fs.existsSync(inputPath)) {
    console.error(`Error: input file not found: ${inputPath}`);
    process.exit(1);
  }

  if (argv.verbose) {
    console.log(`[pendoc-llm] provider : ${config.modelProvider}`);
    console.log(`[pendoc-llm] api key  : ${config.apiKey ? 'configured' : 'not set'}`);
    console.log(`[pendoc-llm] reading  : ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const cleaned = sanitize(raw);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cleaned, 'utf8');

  console.log(`✔  Sanitized output written to: ${outputPath}`);
}

run();
