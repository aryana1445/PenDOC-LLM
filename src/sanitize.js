'use strict';

/**
 * Sanitize and normalize a text or markdown document for LLM ingestion.
 *
 * Transformations applied:
 *  - Trim trailing whitespace from every line
 *  - Collapse runs of more than two consecutive blank lines into two
 *  - Normalize Windows line endings (CRLF) to Unix (LF)
 *  - Ensure the document ends with exactly one newline
 *  - Normalize ATX headings to have a single space after `#` markers
 *
 * @param {string} input - Raw document text
 * @returns {string} Cleaned document text
 */
function sanitize(input) {
  if (typeof input !== 'string') {
    throw new TypeError('sanitize() expects a string input');
  }

  let text = input;

  // Normalize CRLF → LF
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Trim trailing whitespace per line
  text = text
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n');

  // Collapse 3+ consecutive blank lines into 2
  text = text.replace(/\n{3,}/g, '\n\n');

  // Normalize ATX headings: ensure single space after # markers
  text = text.replace(/^(#{1,6})\s+/gm, '$1 ');

  // Ensure the file ends with exactly one newline
  text = text.trimEnd() + '\n';

  return text;
}

module.exports = { sanitize };
