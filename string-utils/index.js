/**
 * String utility functions for common operations in daily JavaScript projects.
 * @module stringUtils
 */

/**
 * Capitalizes the first letter of a string and optionally lowercases the rest.
 * @param {string} str - The input string.
 * @param {boolean} [lowerRest=false] - Lowercase the rest of the string.
 * @returns {string} Capitalized string or empty string if invalid.
 */
function capitalizeString(str, lowerRest = false) {
    if (typeof str !== 'string' || !str) return '';
    return str.charAt(0).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1));
  }
  
  /**
   * Truncates a string to a specified length, adding an ellipsis if truncated.
   * @param {string} str - The input string.
   * @param {number} maxLength - Maximum length of the output string.
   * @param {string} [ellipsis='...'] - Ellipsis to append if truncated.
   * @returns {string} Truncated string or empty string if invalid.
   */
  function truncateString(str, maxLength, ellipsis = '...') {
    if (typeof str !== 'string' || !Number.isInteger(maxLength) || maxLength < 0) return '';
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - ellipsis.length) + ellipsis;
  }
  
  /**
   * Normalizes a string by removing extra spaces, trimming, and optionally converting to lowercase.
   * @param {string} str - The input string.
   * @param {boolean} [toLower=false] - Convert to lowercase.
   * @returns {string} Normalized string or empty string if invalid.
   */
  function normalizeString(str, toLower = false) {
    if (typeof str !== 'string') return '';
    const normalized = str.trim().replace(/\s+/g, ' ');
    return toLower ? normalized.toLowerCase() : normalized;
  }
  
  /**
   * Generates a slug from a string for URL-friendly use.
   * @param {string} str - The input string.
   * @returns {string} Slugified string or empty string if invalid.
   */
  function slugifyString(str) {
    if (typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  
  /**
   * Checks if a string is a valid email address using a regex pattern.
   * @param {string} str - The input string.
   * @returns {boolean} True if valid email, false otherwise.
   */
  function isValidEmail(str) {
    if (typeof str !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }
  
  /**
   * Extracts all matches of a regex pattern from a string.
   * @param {string} str - The input string.
   * @param {RegExp} regex - The regex pattern (global flag recommended).
   * @returns {string[]|null} Array of matches or null if invalid.
   */
  function extractRegexMatches(str, regex) {
    if (typeof str !== 'string' || !(regex instanceof RegExp)) return null;
    return str.match(regex) || [];
  }
  
  /**
   * Replaces all occurrences of a substring with a dynamic replacement function.
   * @param {string} str - The input string.
   * @param {string|RegExp} search - The substring or regex to replace.
   * @param {Function} replacer - Function to generate replacement (receives match, index).
   * @returns {string} Replaced string or empty string if invalid.
   */
  function dynamicReplace(str, search, replacer) {
    if (typeof str !== 'string' || typeof replacer !== 'function') return '';
    try {
      return str.replace(search, (match, ...args) => replacer(match, args[args.length - 1]));
    } catch {
      return str;
    }
  }
  
  /**
   * Converts a string to camelCase.
   * @param {string} str - The input string.
   * @returns {string} CamelCase string or empty string if invalid.
   */
  function toCamelCase(str) {
    if (typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_match, char) => char.toUpperCase());
  }
  
  /**
   * Formats a string using a template with placeholders.
   * @param {string} template - Template string with placeholders (e.g., '{0} {1}').
   * @param {...string} values - Values to replace placeholders.
   * @returns {string} Formatted string or template if invalid.
   */
  function formatString(template, ...values) {
    if (typeof template !== 'string') return '';
    return template.replace(/{(\d+)}/g, (match, index) => 
      typeof values[index] !== 'undefined' ? String(values[index]) : match
    );
  }
  
  /**
   * Checks if a string contains any of the given substrings (case-insensitive option).
   * @param {string} str - The input string.
   * @param {string[]} substrings - Array of substrings to check.
   * @param {boolean} [caseSensitive=true] - Whether to perform case-sensitive search.
   * @returns {boolean} True if any substring is found, false otherwise.
   */
  function containsSubstrings(str, substrings, caseSensitive = true) {
    if (typeof str !== 'string' || !Array.isArray(substrings)) return false;
    const checkStr = caseSensitive ? str : str.toLowerCase();
    return substrings.some(sub => {
      if (typeof sub !== 'string') return false;
      return checkStr.includes(caseSensitive ? sub : sub.toLowerCase());
    });
  }
  
  /**
   * Splits a string into an array of fixed-length chunks.
   * @param {string} str - The input string.
   * @param {number} chunkSize - Size of each chunk.
   * @returns {string[]|null} Array of chunks or null if invalid.
   */
  function chunkString(str, chunkSize) {
    if (typeof str !== 'string' || !Number.isInteger(chunkSize) || chunkSize <= 0) return null;
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.slice(i, i + chunkSize));
    }
    return chunks;
  }
  
  /**
   * Removes HTML tags from a string, preserving content.
   * @param {string} str - The input string with HTML.
   * @returns {string} String without HTML tags or empty string if invalid.
   */
  function stripHtmlTags(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/<[^>]+>/g, '');
  }
  
  /**
   * Encodes a string to Base64.
   * @param {string} str - The input string.
   * @returns {string} Base64-encoded string or empty string if invalid.
   */
  function encodeToBase64(str) {
    if (typeof str !== 'string') return '';
    try {
      return btoa(str);
    } catch {
      return '';
    }
  }
  
  /**
   * Decodes a Base64 string.
   * @param {string} str - The Base64-encoded string.
   * @returns {string} Decoded string or empty string if invalid.
   */
  function decodeFromBase64(str) {
    if (typeof str !== 'string') return '';
    try {
      return atob(str);
    } catch {
      return '';
    }
  }
  
  /**
   * Generates a random string of specified length using alphanumeric characters.
   * @param {number} length - Length of the random string.
   * @returns {string} Random string or empty string if invalid.
   */
  function generateRandomString(length) {
    if (!Number.isInteger(length) || length <= 0) return '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  /**
   * Counts occurrences of a substring or regex pattern in a string.
   * @param {string} str - The input string.
   * @param {string|RegExp} search - The substring or regex to count.
   * @returns {number} Number of occurrences or 0 if invalid.
   */
  function countOccurrences(str, search) {
    if (typeof str !== 'string' || (!search && !(search instanceof RegExp))) return 0;
    if (typeof search === 'string') {
      return str.split(search).length - 1;
    }
    const matches = str.match(search);
    return matches ? matches.length : 0;
  }
  
  // Export functions for Node.js/CommonJS usage
  module.exports = {
    capitalizeString,
    truncateString,
    normalizeString,
    slugifyString,
    isValidEmail,
    extractRegexMatches,
    dynamicReplace,
    toCamelCase,
    formatString,
    containsSubstrings,
    chunkString,
    stripHtmlTags,
    encodeToBase64,
    decodeFromBase64,
    generateRandomString,
    countOccurrences
  };