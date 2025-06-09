/**
 * Utility functions for common complex operations in daily JavaScript projects.
 * @module projectUtils
 */

/**
 * Creates a deep copy of an object or array, handling nested structures, dates, and circular references.
 * @param {any} input - The input to deep copy (object, array, etc.).
 * @param {WeakMap} [seen=new WeakMap()] - Tracks circular references.
 * @returns {any} Deep copied value or null if invalid.
 */
function deepCopy(input, seen = new WeakMap()) {
    if (input === null || typeof input !== 'object') return input;
    if (seen.has(input)) return seen.get(input);
  
    if (input instanceof Date) return new Date(input.getTime());
    if (input instanceof RegExp) return new RegExp(input);
    if (Array.isArray(input)) {
      const copy = [];
      seen.set(input, copy);
      input.forEach((item, index) => {
        copy[index] = deepCopy(item, seen);
      });
      return copy;
    }
    const copy = Object.create(Object.getPrototypeOf(input));
    seen.set(input, copy);
    for (const key of Object.keys(input)) {
      copy[key] = deepCopy(input[key], seen);
    }
    return copy;
  }
  
  /**
   * Debounces a function to limit its execution rate.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - Delay in milliseconds.
   * @param {boolean} [immediate=false] - Trigger immediately on leading edge.
   * @returns {Function} Debounced function.
   */
  function debounce(func, wait, immediate = false) {
    if (typeof func !== 'function' || !Number.isInteger(wait) || wait < 0) {
      throw new Error('Invalid function or wait time');
    }
    let timeout;
    return function (...args) {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  /**
   * Throttles a function to limit its execution frequency.
   * @param {Function} func - The function to throttle.
   * @param {number} limit - Minimum interval in milliseconds.
   * @returns {Function} Throttled function.
   */
  function throttle(func, limit) {
    if (typeof func !== 'function' || !Number.isInteger(limit) || limit < 0) {
      throw new Error('Invalid function or limit');
    }
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        return func.apply(this, args);
      }
    };
  }
  
  /**
   * Validates an object against a schema (key-value pairs with type or regex).
   * @param {Object} obj - The object to validate.
   * @param {Object} schema - Schema with keys and expected types or regex.
   * @returns {boolean} True if valid, false otherwise.
   * @example
   * validateObject({ name: 'John', age: 30 }, { name: 'string', age: 'number' })
   */
  function validateObject(obj, schema) {
    if (!obj || typeof obj !== 'object' || !schema || typeof schema !== 'object') return false;
    for (const [key, rule] of Object.entries(schema)) {
      if (!(key in obj)) return false;
      if (typeof rule === 'string' && typeof obj[key] !== rule) return false;
      if (rule instanceof RegExp && (typeof obj[key] !== 'string' || !rule.test(obj[key]))) return false;
    }
    return true;
  }
  
  /**
   * Groups an array of objects by a key or function, with optional transformation.
   * @param {Array} array - Array of objects to group.
   * @param {string|Function} keyOrFunc - Key to group by or function returning the key.
   * @param {Function} [transform] - Optional transformation function for values.
   * @returns {Object} Grouped object or empty object if invalid.
   */
  function groupBy(array, keyOrFunc, transform) {
    if (!Array.isArray(array)) return {};
    return array.reduce((acc, item) => {
      const key = typeof keyOrFunc === 'function' ? keyOrFunc(item) : item[keyOrFunc];
      if (key === undefined) return acc;
      acc[key] = acc[key] || [];
      acc[key].push(transform ? transform(item) : item);
      return acc;
    }, {});
  }
  
  /**
   * Flattens a nested array to a specified depth.
   * @param {Array} array - The array to flatten.
   * @param {number} [depth=Infinity] - Depth to flatten (default: fully flatten).
   * @returns {Array} Flattened array or empty array if invalid.
   */
  function flattenArray(array, depth = Infinity) {
    if (!Array.isArray(array)) return [];
    return array.reduce((flat, current) => {
      if (Array.isArray(current) && depth > 0) {
        return flat.concat(flattenArray(current, depth - 1));
      }
      return flat.concat(current);
    }, []);
  }
  
  /**
   * Retries an async function with exponential backoff.
   * @param {Function} asyncFunc - Async function to retry.
   * @param {number} [maxRetries=3] - Maximum number of retries.
   * @param {number} [baseDelay=100] - Base delay in milliseconds.
   * @returns {Promise} Result of the function or throws the last error.
   */
  async function retryWithBackoff(asyncFunc, maxRetries = 3, baseDelay = 100) {
    if (typeof asyncFunc !== 'function' || !Number.isInteger(maxRetries) || maxRetries < 0) {
      throw new Error('Invalid function or retries');
    }
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFunc();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  /**
   * Parses a complex query string into an object with type coercion.
   * @param {string} query - Query string (e.g., "name=John&age=30&active=true").
   * @returns {Object} Parsed object with coerced values or empty object if invalid.
   */
  function parseQueryString(query) {
    if (typeof query !== 'string') return {};
    try {
      const params = new URLSearchParams(query);
      const result = {};
      for (const [key, value] of params) {
        if (value === 'true') result[key] = true;
        else if (value === 'false') result[key] = false;
        else if (!isNaN(value) && value.trim() !== '') result[key] = Number(value);
        else result[key] = value;
      }
      return result;
    } catch {
      return {};
    }
  }
  
  /**
   * Merges multiple objects deeply, resolving conflicts by prioritizing later objects.
   * deep copy of objects, handling nested structures, dates, and circular references.
   * @param {...Object} objects - Objects to merge.
   * @returns {Object} Merged object or empty object if invalid.
   */
  function deepMerge(...objects) {
    if (!objects.every(obj => obj && typeof obj === 'object')) return {};
    const seen = new WeakMap();
    const merge = (target, source) => {
      if (source === null || typeof source !== 'object') return source;
      if (seen.has(source)) return seen.get(source);
      if (source instanceof Date) return new Date(source.getTime());
      if (source instanceof RegExp) return new RegExp(source);
      if (Array.isArray(source)) {
        const arr = target && Array.isArray(target) ? target : [];
        seen.set(source, arr);
        source.forEach((item, index) => {
          arr[index] = merge(arr[index], item);
        });
        return arr;
      }
      const obj = target && typeof target === 'object' && !Array.isArray(target) ? target : {};
      seen.set(source, obj);
      for (const key of Object.keys(source)) {
        obj[key] = merge(obj[key], source[key]);
      }
      return obj;
    };
    return objects.reduce((acc, obj) => merge(acc, obj), {});
  }
  
  /**
   * Generates a unique ID based on timestamp and random string.
   * @param {number} [length=16] - Length of the random string portion.
   * @returns {string} Unique ID.
   */
  function generateUniqueId(length = 16) {
    if (!Number.isInteger(length) || length < 0) length = 16;
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 2 + length);
    return `${timestamp}-${random}`;
  }
  
  /**
   * Sanitizes a string for safe HTML usage by escaping special characters.
   * @param {string} input - String to sanitize.
   * @returns {string} Sanitized string or empty string if invalid.
   */
  function sanitizeHtmlString(input) {
    if (typeof input !== 'string') return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    return input.replace(/[&<>"'/]/g, char => map[char]);
  }
  
  /**
   * Chunks an array into smaller arrays of specified size.
   * @param {Array} array - Array to chunk.
   * @param {number} size - Size of each chunk.
   * @returns {Array} Array of chunked arrays or empty array if invalid.
   */
  function chunkArray(array, size) {
    if (!Array.isArray(array) || !Number.isInteger(size) || size <= 0) return [];
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  
  /**
   * Caches the result of a function based on its arguments.
   * @param {Function} func - Function to memoize.
   * @returns {Function} Memoized function.
   */
  function memoize(func) {
    if (typeof func !== 'function') throw new Error('Invalid function');
    const cache = new Map();
    return function (...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = func.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
  
  /**
   * Converts an object to a query string with proper encoding.
   * @param {Object} obj - Object to convert.
   * @returns {string} Query string or empty string if invalid.
   */
  function toQueryString(obj) {
    if (!obj || typeof obj !== 'object') return '';
    try {
      return Object.entries(obj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    } catch {
      return '';
    }
  }
  
  /**
   * Performs a deep comparison of two values for equality.
   * @param {any} a - First value.
   * @param {any} b - Second value.
   * @param {WeakMap} [seen=new WeakMap()] - Tracks circular references.
   * @returns {boolean} True if values are deeply equal.
   */
  function deepEqual(a, b, seen = new WeakMap()) {
    if (a === b) return true;
    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
    if (seen.has(a) && seen.get(a) === b) return true;
    seen.set(a, b);
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, index) => deepEqual(item, b[index], seen));
    }
    if (Array.isArray(a) || Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => deepEqual(a[key], b[key], seen));
  }
  
  // Export functions for Node.js/CommonJS usage
  module.exports = {
    deepCopy,
    debounce,
    throttle,
    validateObject,
    groupBy,
    flattenArray,
    retryWithBackoff,
    parseQueryString,
    deepMerge,
    generateUniqueId,
    sanitizeHtmlString,
    chunkArray,
    memoize,
    toQueryString,
    deepEqual
  };