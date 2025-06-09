const moment = require('moment');
const momentTz = require('moment-timezone');

/**
 * Generates an array of Moment objects for a recurring event within a date range.
 * @param {string|Object} startDate - Start date of the range (Moment object or string).
 * @param {string|Object} endDate - End date of the range (Moment object or string).
 * @param {string} intervalUnit - Unit of recurrence (e.g., 'days', 'weeks', 'months').
 * @param {number} intervalValue - Number of units between occurrences.
 * @param {string} [timezone] - Optional timezone (e.g., 'America/New_York').
 * @returns {Object[]|null} Array of Moment objects or null if invalid.
 */
function generateRecurringEvents(startDate, endDate, intervalUnit, intervalValue, timezone) {
  const start = moment.isMoment(startDate) ? startDate.clone() : moment(startDate);
  const end = moment.isMoment(endDate) ? endDate.clone() : moment(endDate);
  if (!start.isValid() || !end.isValid() || !Number.isInteger(intervalValue) || intervalValue <= 0) return null;
  if (timezone && !momentTz.tz.zone(timezone)) return null;

  const events = [];
  let current = timezone ? start.tz(timezone) : start;
  const endWithTz = timezone ? end.tz(timezone) : end;

  while (current.isSameOrBefore(endWithTz)) {
    events.push(current.clone());
    current.add(intervalValue, intervalUnit);
  }
  return events;
}

/**
 * Converts an array of dates to another timezone and formats them.
 * @param {Array<string|Object>} dates - Array of dates (Moment objects or strings).
 * @param {string} targetTimezone - Target timezone (e.g., 'Asia/Tokyo').
 * @param {string} [format='YYYY-MM-DD HH:mm:ss z'] - Output format.
 * @returns {string[]|null} Array of formatted date strings or null if invalid.
 */
function batchConvertTimezone(dates, targetTimezone, format = 'YYYY-MM-DD HH:mm:ss z') {
  if (!Array.isArray(dates) || !momentTz.tz.zone(targetTimezone)) return null;
  return dates.map(date => {
    const momentDate = moment.isMoment(date) ? date.clone() : moment(date);
    if (!momentDate.isValid()) return '';
    return momentDate.tz(targetTimezone).format(format);
  }).filter(formatted => formatted !== '');
}

/**
 * Calculates the intersection of two date ranges.
 * @param {string|Object} start1 - Start of first range (Moment object or string).
 * @param {string|Object} end1 - End of first range (Moment object or string).
 * @param {string|Object} start2 - Start of second range (Moment object or string).
 * @param {string|Object} end2 - End of second range (Moment object or string).
 * @returns {Object|null} Object with start and end Moments of intersection or null if no intersection or invalid.
 */
function getDateRangeIntersection(start1, end1, start2, end2) {
  const mStart1 = moment.isMoment(start1) ? start1.clone() : moment(start1);
  const mEnd1 = moment.isMoment(end1) ? end1.clone() : moment(end1);
  const mStart2 = moment.isMoment(start2) ? start2.clone() : moment(start2);
  const mEnd2 = moment.isMoment(end2) ? end2.clone() : moment(end2);

  if (!mStart1.isValid() || !mEnd1.isValid() || !mStart2.isValid() || !mEnd2.isValid()) return null;
  if (mStart1.isAfter(mEnd1) || mStart2.isAfter(mEnd2)) return null;

  const intersectionStart = moment.max(mStart1, mStart2);
  const intersectionEnd = moment.min(mEnd1, mEnd2);

  if (intersectionStart.isAfter(intersectionEnd)) return null;
  return { start: intersectionStart, end: intersectionEnd };
}

/**
 * Splits a date range into chunks by a specified unit and size.
 * @param {string|Object} startDate - Start date of the range (Moment object or string).
 * @param {string|Object} endDate - End date of the range (Moment object or string).
 * @param {string} unit - Unit of time to split by (e.g., 'days', 'weeks').
 * @param {number} chunkSize - Size of each chunk in the specified unit.
 * @returns {Object[]|null} Array of range objects with start and end Moments or null if invalid.
 */
function splitDateRange(startDate, endDate, unit, chunkSize) {
  const start = moment.isMoment(startDate) ? startDate.clone() : moment(startDate);
  const end = moment.isMoment(endDate) ? endDate.clone() : moment(endDate);
  if (!start.isValid() || !end.isValid() || !Number.isInteger(chunkSize) || chunkSize <= 0) return null;

  const ranges = [];
  let currentStart = start.clone();
  while (currentStart.isSameOrBefore(end)) {
    const currentEnd = currentStart.clone().add(chunkSize - 1, unit).endOf(unit);
    if (currentEnd.isAfter(end)) {
      ranges.push({ start: currentStart, end: end });
      break;
    }
    ranges.push({ start: currentStart.clone(), end: currentEnd });
    currentStart.add(chunkSize, unit).startOf(unit);
  }
  return ranges;
}

/**
 * Aggregates durations of multiple date ranges in a specified unit.
 * @param {Array<{start: string|Object, end: string|Object}>} ranges - Array of range objects.
 * @param {string} unit - Unit of time (e.g., 'days', 'hours').
 * @returns {number|null} Total duration in the specified unit or null if invalid.
 */
function aggregateDateRanges(ranges, unit) {
  if (!Array.isArray(ranges)) return null;
  let totalDuration = 0;
  for (const range of ranges) {
    const start = moment.isMoment(range.start) ? range.start.clone() : moment(range.start);
    const end = moment.isMoment(range.end) ? range.end.clone() : moment(range.end);
    if (!start.isValid() || !end.isValid() || start.isAfter(end)) return null;
    totalDuration += end.diff(start, unit, true);
  }
  return totalDuration;
}

/**
 * Finds the next valid business day after a given date, excluding weekends and optional holidays.
 * @param {string|Object} date - Starting date (Moment object or string).
 * @param {string[]|Object[]} [holidays=[]] - Array of holiday dates (strings or Moment objects).
 * @returns {Object|null} Moment object for the next business day or null if invalid.
 */
function getNextBusinessDay(date, holidays = []) {
  const momentDate = moment.isMoment(date) ? date.clone() : moment(date);
  if (!momentDate.isValid()) return null;

  const holidayDates = holidays.map(h => moment.isMoment(h) ? h.clone() : moment(h))
    .filter(h => h.isValid())
    .map(h => h.format('YYYY-MM-DD'));

  let nextDay = momentDate.clone().add(1, 'day');
  while (nextDay.day() === 0 || nextDay.day() === 6 || holidayDates.includes(nextDay.format('YYYY-MM-DD'))) {
    nextDay.add(1, 'day');
  }
  return nextDay;
}

/**
 * Generates a schedule of available time slots within a date range, respecting constraints.
 * @param {string|Object} startDate - Start of the range (Moment object or string).
 * @param {string|Object} endDate - End of the range (Moment object or string).
 * @param {number} slotDuration - Duration of each slot in minutes.
 * @param {Object} [constraints={}] - Constraints like { days: [0, 6], hours: { start: '09:00', end: '17:00' } }.
 * @param {string} [timezone] - Optional timezone.
 * @returns {Object[]|null} Array of slot objects with start and end Moments or null if invalid.
 */
function generateTimeSlots(startDate, endDate, slotDuration, constraints = {}, timezone) {
  const start = moment.isMoment(startDate) ? startDate.clone() : moment(startDate);
  const end = moment.isMoment(endDate) ? endDate.clone() : moment(endDate);
  if (!start.isValid() || !end.isValid() || !Number.isInteger(slotDuration) || slotDuration <= 0) return null;
  if (timezone && !momentTz.tz.zone(timezone)) return null;

  const { days = [], hours = { start: '00:00', end: '23:59' } } = constraints;
  const slots = [];
  let current = timezone ? start.tz(timezone) : start;
  const endWithTz = timezone ? end.tz(timezone) : end;

  while (current.isSameOrBefore(endWithTz)) {
    const dayStart = current.clone().set({ hour: moment(hours.start, 'HH:mm').hour(), minute: moment(hours.start, 'HH:mm').minute() });
    const dayEnd = current.clone().set({ hour: moment(hours.end, 'HH:mm').hour(), minute: moment(hours.end, 'HH:mm').minute() });
    if (!days.includes(current.day()) && dayStart.isSameOrBefore(endWithTz)) {
      let slotStart = dayStart.clone();
      while (slotStart.isSameOrBefore(dayEnd) && slotStart.isSameOrBefore(endWithTz)) {
        const slotEnd = slotStart.clone().add(slotDuration, 'minutes');
        if (slotEnd.isAfter(dayEnd) || slotEnd.isAfter(endWithTz)) break;
        slots.push({ start: slotStart.clone(), end: slotEnd.clone() });
        slotStart.add(slotDuration, 'minutes');
      }
    }
    current.add(1, 'day').startOf('day');
  }
  return slots;
}

// Export functions for Node.js/CommonJS usage
module.exports = {
  generateRecurringEvents,
  batchConvertTimezone,
  getDateRangeIntersection,
  splitDateRange,
  aggregateDateRanges,
  getNextBusinessDay,
  generateTimeSlots
};