'use strict';

const { sanitize } = require('../src/sanitize');

describe('sanitize()', () => {
  test('trims trailing whitespace from lines', () => {
    const input = 'hello   \nworld  ';
    expect(sanitize(input)).toBe('hello\nworld\n');
  });

  test('normalizes CRLF line endings to LF', () => {
    const input = 'line one\r\nline two\r\n';
    expect(sanitize(input)).toBe('line one\nline two\n');
  });

  test('collapses more than two consecutive blank lines into two', () => {
    const input = 'para one\n\n\n\npara two';
    expect(sanitize(input)).toBe('para one\n\npara two\n');
  });

  test('preserves a single blank line between paragraphs', () => {
    const input = 'para one\n\npara two';
    expect(sanitize(input)).toBe('para one\n\npara two\n');
  });

  test('normalizes ATX heading spacing', () => {
    const input = '##  Introduction\n\nSome text.';
    expect(sanitize(input)).toBe('## Introduction\n\nSome text.\n');
  });

  test('ensures file ends with exactly one newline', () => {
    expect(sanitize('hello')).toMatch(/\n$/);
    expect(sanitize('hello\n\n\n')).toBe('hello\n');
  });

  test('throws TypeError for non-string input', () => {
    expect(() => sanitize(null)).toThrow(TypeError);
    expect(() => sanitize(42)).toThrow(TypeError);
  });

  test('handles empty string', () => {
    expect(sanitize('')).toBe('\n');
  });
});
