const moment = require('moment');
const momentTz = require('moment-timezone');

/**
 * Creates a Moment object for the current date and time.
 * @returns {Object} Moment object representing current date and time.
 */
function getCurrentDateTime() {
  return moment();
}

/**
 * Parses a date string into a Moment object.
 * @param {string} dateString - The date string to parse (e.g., "2025-06-10").
 * @returns {Object} Moment object or null if invalid.
 */
function parseDateString(dateString) {
  const parsed = moment(dateString);
  return parsed.isValid() ? parsed : null;
}

/**
 * Parses a date string with a specific format.
 * @param {string} dateString - The date string to parse.
 * @param {string} format - The format of the date string (e.g., "MM-DD-YYYY").
 * @returns {Object} Moment object or null if invalid.
 */
function parseDateWithFormat(dateString, format) {
  const parsed = moment(dateString, format, true);
  return parsed.isValid() ? parsed : null;
}

/**
 * Parses a date string against multiple formats with optional strict mode.
 * @param {string} dateString - The date string to parse.
 * @param {string[]} formats - Array of format strings to try.
 * @param {boolean} [strict=false] - Whether to use strict parsing.
 * @returns {Object} Moment object or null if invalid.
 */
function parseDateWithMultipleFormats(dateString, formats, strict = false) {
  const parsed = moment(dateString, formats, strict);
  return parsed.isValid() ? parsed : null;
}

/**
 * Creates a Moment from a native JavaScript Date object.
 * @param {Date} date - The Date object.
 * @returns {Object} Moment object or null if invalid.
 */
function parseFromDate(date) {
  if (!(date instanceof Date) || isNaN(date)) return null;
  return moment(date);
}

/**
 * Creates a Moment from a Unix timestamp (milliseconds).
 * @param {number} timestamp - Unix timestamp in milliseconds.
 * @returns {Object} Moment object or null if invalid.
 */
function parseFromUnixTimestamp(timestamp) {
  if (typeof timestamp !== 'number' || isNaN(timestamp)) return null;
  return moment(timestamp);
}

/**
 * Clones a Moment object to avoid mutating the original.
 * @param {Object} momentObj - The Moment object to clone.
 * @returns {Object} Cloned Moment object or null if invalid.
 */
function cloneMoment(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.clone();
}

/**
 * Parses a date string with timezone information.
 * @param {string} dateString - The date string with timezone (e.g., "2025-06-10T10:00:00-05:00").
 * @returns {Object} Moment object with timezone or null if invalid.
 */
function parseWithTimezone(dateString) {
  const parsed = moment.parseZone(dateString);
  return parsed.isValid() ? parsed : null;
}

/**
 * Formats a Moment object using a custom format.
 * @param {Object} momentObj - The Moment object to format.
 * @param {string} format - The format string (e.g., "YYYY-MM-DD").
 * @returns {string} Formatted date string or empty string if invalid.
 */
function formatDate(momentObj, format) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.format(format);
}

/**
 * Formats a Moment object as ISO 8601 string.
 * @param {Object} momentObj - The Moment object.
 * @returns {string} ISO 8601 formatted string or empty string if invalid.
 */
function formatAsIsoString(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.toISOString();
}

/**
 * Formats a Moment object as a human-readable string.
 * @param {Object} momentObj - The Moment object.
 * @returns {string} Human-readable date string or empty string if invalid.
 */
function formatAsString(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.toString();
}

/**
 * Gets relative time from now for a Moment object.
 * @param {Object} momentObj - The Moment object.
 * @returns {string} Relative time string or empty string if invalid.
 */
function getRelativeTimeFromNow(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.fromNow();
}

/**
 * Gets relative time from another date.
 * @param {Object} momentObj - The source Moment object.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @param {boolean} [withoutPrefix=false] - Remove prefix like "in" or "ago".
 * @returns {string} Relative time string or empty string if invalid.
 */
function getRelativeTimeFrom(momentObj, target, withoutPrefix = false) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.from(target, withoutPrefix);
}

/**
 * Gets relative time to now.
 * @param {Object} momentObj - The Moment object.
 * @param {boolean} [withoutPrefix=false] - Remove prefix like "in" or "ago".
 * @returns {string} Relative time string or empty string if invalid.
 */
function getRelativeTimeToNow(momentObj, withoutPrefix = false) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.toNow(withoutPrefix);
}

/**
 * Gets relative time to another date.
 * @param {Object} momentObj - The source Moment object.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @param {boolean} [withoutPrefix=false] - Remove prefix like "in" or "ago".
 * @returns {string} Relative time string or empty string if invalid.
 */
function getRelativeTimeTo(momentObj, target, withoutPrefix = false) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.to(target, withoutPrefix);
}

/**
 * Gets calendar time relative to now (e.g., "Today", "Tomorrow").
 * @param {Object} momentObj - The Moment object.
 * @returns {string} Calendar time string or empty string if invalid.
 */
function getCalendarTime(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return '';
  return momentObj.calendar();
}

/**
 * Adds time to a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {number} amount - Amount to add.
 * @param {string} unit - Unit of time (e.g., "days", "months").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function addTime(momentObj, amount, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || typeof amount !== 'number') return null;
  return momentObj.add(amount, unit);
}

/**
 * Adds multiple time units to a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {Object} units - Object with units to add (e.g., { years: 1, months: 2 }).
 * @returns {Object} Modified Moment object or null if invalid.
 */
function addMultipleTimeUnits(momentObj, units) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || typeof units !== 'object') return null;
  return momentObj.add(units);
}

/**
 * Subtracts time from a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {number} amount - Amount to subtract.
 * @param {string} unit - Unit of time (e.g., "days", "months").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function subtractTime(momentObj, amount, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || typeof amount !== 'number') return null;
  return momentObj.subtract(amount, unit);
}

/**
 * Subtracts multiple time units from a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {Object} units - Object with units to subtract (e.g., { hours: 3, minutes: 15 }).
 * @returns {Object} Modified Moment object or null if invalid.
 */
function subtractMultipleTimeUnits(momentObj, units) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || typeof units !== 'object') return null;
  return momentObj.subtract(units);
}

/**
 * Sets a Moment to the start of a time unit.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {string} unit - Unit of time (e.g., "day", "month").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function setStartOfUnit(momentObj, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.startOf(unit);
}

/**
 * Sets a Moment to the end of a time unit.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {string} unit - Unit of time (e.g., "day", "month").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function setEndOfUnit(momentObj, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.endOf(unit);
}

/**
 * Converts a Moment to local timezone.
 * @param {Object} momentObj - The Moment object to modify.
 * @returns {Object} Modified Moment object in local timezone or null if invalid.
 */
function convertToLocal(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.local();
}

/**
 * Converts a Moment to UTC.
 * @param {Object} momentObj - The Moment object to modify.
 * @returns {Object} Modified Moment object in UTC or null if invalid.
 */
function convertToUtc(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.utc();
}

/**
 * Sets a specific UTC offset for a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {number|string} offset - UTC offset in minutes or string (e.g., "-05:00").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function setUtcOffset(momentObj, offset) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return null;
  return momentObj.utcOffset(offset);
}

/**
 * Sets a specific timezone for a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {string} timezone - Timezone name (e.g., "America/New_York").
 * @returns {Object} Modified Moment object or null if invalid.
 */
function setTimezone(momentObj, timezone) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || !momentTz.tz.zone(timezone)) return null;
  return momentObj.tz(timezone);
}

/**
 * Checks if a Moment is before another date.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @returns {boolean} True if momentObj is before target, false otherwise.
 */
function isBeforeDate(momentObj, target) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isBefore(target);
}

/**
 * Checks if a Moment is after another date.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @returns {boolean} True if momentObj is after target, false otherwise.
 */
function isAfterDate(momentObj, target) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isAfter(target);
}

/**
 * Checks if two Moments represent the same date.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @returns {boolean} True if dates are the same, false otherwise.
 */
function isSameDate(momentObj, target) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isSame(target);
}

/**
 * Checks if a Moment is the same or before another date.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @returns {boolean} True if momentObj is same or before target, false otherwise.
 */
function isSameOrBeforeDate(momentObj, target) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isSameOrBefore(target);
}

/**
 * Checks if a Moment is the same or after another date.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @returns {boolean} True if momentObj is same or after target, false otherwise.
 */
function isSameOrAfterDate(momentObj, target) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isSameOrAfter(target);
}

/**
 * Checks if a Moment is between two dates.
 * @param {Object} momentObj - The Moment object to check.
 * @param {Object|string|number|Date|Array} start - The start date.
 * @param {Object|string|number|Date|Array} end - The end date.
 * @returns {boolean} True if momentObj is between start and end, false otherwise.
 */
function isBetweenDates(momentObj, start, end) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isBetween(start, end);
}

/**
 * Checks if a Moment object is valid.
 * @param {Object} momentObj - The Moment object to check.
 * @returns {boolean} True if the Moment is valid, false otherwise.
 */
function isValidDate(momentObj) {
  return moment.isMoment(momentObj) && momentObj.isValid();
}

/**
 * Checks if the year of a Moment is a leap year.
 * @param {Object} momentObj - The Moment object to check.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
function isLeapYear(momentObj) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return false;
  return momentObj.isLeapYear();
}

/**
 * Gets the difference between two Moments in a specified unit.
 * @param {Object} momentObj - The source Moment object.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @param {string} unit - Unit of time (e.g., "days", "months").
 * @returns {number} Difference in the specified unit or 0 if invalid.
 */
function getDifference(momentObj, target, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return 0;
  return momentObj.diff(target, unit);
}

/**
 * Gets the difference between two Moments in a specified unit with floating-point precision.
 * @param {Object} momentObj - The source Moment object.
 * @param {Object|string|number|Date|Array} target - The target date to compare against.
 * @param {string} unit - Unit of time (e.g., "days", "months").
 * @returns {number} Difference in the specified unit with decimals or 0 if invalid.
 */
function getPreciseDifference(momentObj, target, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return 0;
  return momentObj.diff(target, unit, true);
}

/**
 * Gets a specific component (e.g., year, month) of a Moment object.
 * @param {Object} momentObj - The Moment object.
 * @param {string} unit - Unit to get (e.g., "year", "month", "date").
 * @returns {number} Value of the specified unit or 0 if invalid.
 */
function getDateComponent(momentObj, unit) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid()) return 0;
  return momentObj.get(unit);
}

/**
 * Sets a specific component (e.g., year, month) of a Moment object.
 * @param {Object} momentObj - The Moment object to modify.
 * @param {string} unit - Unit to set (e.g., "year", "month", "date").
 * @param {number} value - Value to set.
 * @returns {Object} Modified Moment object or null if invalid.
 */
function setDateComponent(momentObj, unit, value) {
  if (!moment.isMoment(momentObj) || !momentObj.isValid() || typeof value !== 'number') return null;
  return momentObj.set(unit, value);
}

// Export functions for Node.js/CommonJS usage
module.exports = {
  getCurrentDateTime,
  parseDateString,
  parseDateWithFormat,
  parseDateWithMultipleFormats,
  parseFromDate,
  parseFromUnixTimestamp,
  cloneMoment,
  parseWithTimezone,
  formatDate,
  formatAsIsoString,
  formatAsString,
  getRelativeTimeFromNow,
  getRelativeTimeFrom,
  getRelativeTimeToNow,
  getRelativeTimeTo,
  getCalendarTime,
  addTime,
  addMultipleTimeUnits,
  subtractTime,
  subtractMultipleTimeUnits,
  setStartOfUnit,
  setEndOfUnit,
  convertToLocal,
  convertToUtc,
  setUtcOffset,
  setTimezone,
  isBeforeDate,
  isAfterDate,
  isSameDate,
  isSameOrBeforeDate,
  isSameOrAfterDate,
  isBetweenDates,
  isValidDate,
  isLeapYear,
  getDifference,
  getPreciseDifference,
  getDateComponent,
  setDateComponent
};