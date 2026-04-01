'use strict';

require('dotenv').config();

const config = {
  apiKey: process.env.PAID_SERVICE_API_KEY || '',
  modelProvider: process.env.MODEL_PROVIDER || 'mock',
  logLevel: process.env.LOG_LEVEL || 'info',
};

/**
 * Returns a masked version of a string, showing only the last 4 characters.
 * @param {string} str
 * @returns {string}
 */
function maskSecret(str) {
  if (!str || str.length <= 4) return '****';
  return '*'.repeat(str.length - 4) + str.slice(-4);
}

module.exports = { config, maskSecret };
