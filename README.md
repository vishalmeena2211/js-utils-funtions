# JSUtils

A comprehensive, open-source JavaScript library providing essential utility functions for daily web development projects. `JSUtils` includes robust, reusable utilities for string manipulation, date/time operations (powered by Moment.js), and general-purpose tasks like deep copying, debouncing, and data validation. Designed for both Node.js and browser environments, it simplifies development for applications like hotel management systems, e-commerce platforms, or any JavaScript project.

## About the Repository

`JSUtils` streamlines common JavaScript tasks, such as form validation, data processing, scheduling, and performance optimization. Organized into modular files, each utility category is well-documented with JSDoc comments and includes robust error handling. This library is ideal for developers seeking reliable, dependency-light solutions.

### Key Features

- **Comprehensive Utilities**: Covers strings, dates, and general-purpose functions.
- **Modular Structure**: Includes `stringUtils.js`, `momentUtils.js`, `advancedMomentUtils.js`, and `projectUtils.js`.
- **Robust Error Handling**: Validates inputs with safe defaults (e.g., empty strings, null).
- **Cross-Environment Support**: Works in Node.js and browsers (with minor adjustments).
- **Minimal Dependencies**: Only Moment.js and Moment TimeZone for date utilities; others are dependency-free.
- **Well-Documented**: Clear JSDoc comments for each function.

### Included Utilities

#### String Utilities (`stringUtils.js`)

- `capitalizeString`: Capitalizes the first letter of a string.
- `truncateString`: Truncates strings with an ellipsis.
- `normalizeString`: Removes extra spaces, optionally lowercases.
- `slugifyString`: Generates URL-friendly slugs.
- `isValidEmail`: Validates email addresses.
- `extractRegexMatches`: Extracts regex matches.
- `dynamicReplace`: Replaces substrings dynamically.
- `toCamelCase`: Converts to camelCase.
- `formatString`: Formats with placeholders.
- `containsSubstrings`: Checks for substrings.
- `chunkString`: Splits into fixed-length chunks.
- `stripHtmlTags`: Removes HTML tags.
- `encodeToBase64` / `decodeFromBase64`: Handles Base64 encoding/decoding.
- `generateRandomString`: Creates random alphanumeric strings.
- `countOccurrences`: Counts substring/regex occurrences.

#### Date/Time Utilities (`momentUtils.js`)

- `getCurrentDateTime`: Gets current date/time.
- `parseDateString`: Parses date strings.
- `formatDate`: Formats dates with custom patterns.
- `addTime` / `subtractTime`: Modifies dates by time units.
- `isBeforeDate` / `isAfterDate`: Compares dates.
- `setTimezone`: Converts to specific timezones (requires Moment TimeZone).
- And more for parsing, formatting, and querying.

#### Advanced Date/Time Utilities (`advancedMomentUtils.js`)

- `generateRecurringEvents`: Creates recurring event dates.
- `batchConvertTimezone`: Converts multiple dates to a timezone.
- `getDateRangeIntersection`: Finds overlapping date ranges.
- `splitDateRange`: Splits ranges into chunks.
- `aggregateDateRanges`: Calculates total duration of ranges.
- `getNextBusinessDay`: Finds next business day, skipping holidays.
- `generateTimeSlots`: Generates time slots with constraints.

#### General Utilities (`projectUtils.js`)

- `deepCopy`: Deeply copies objects/arrays, handling circular references.
- `debounce` / `throttle`: Limits function execution rates.
- `validateObject`: Validates objects against schemas.
- `groupBy`: Groups arrays by key/function.
- `flattenArray`: Flattens nested arrays.
- `retryWithBackoff`: Retries async functions with backoff.
- `parseQueryString` / `toQueryString`: Handles query strings.
- `deepMerge`: Merges objects deeply.
- `generateUniqueId`: Creates unique IDs.
- `sanitizeHtmlString`: Escapes HTML characters.
- `chunkArray`: Splits arrays into chunks.
- `memoize`: Caches function results.
- `deepEqual`: Compares values deeply.

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/js-utils.git
```

For Node.js, copy the desired `.js` files to your project. For browsers, include via `<script>` tags or use a bundler. For date/time utilities, install dependencies:

```bash
npm install moment moment-timezone
```

## Usage

### Node.js

Import specific utilities:

```javascript
const { capitalizeString, deepCopy, generateRecurringEvents } = require('./stringUtils');
// or, once published: require('js-utils');
console.log(capitalizeString('hello world')); // 'Hello world'
console.log(deepCopy({ a: 1, b: { c: 2 } })); // Deep copied object
console.log(generateRecurringEvents('2025-06-10', '2025-06-20', 'days', 2));
```

### Browser

Include files and Moment.js dependencies:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.46/moment-timezone-with-data.min.js"></script>
<script src="stringUtils.js"></script>
<script src="momentUtils.js"></script>
<script src="advancedMomentUtils.js"></script>
<script src="projectUtils.js"></script>
<script>
  console.log(capitalizeString('hello world')); // 'Hello world'
  console.log(formatDate(getCurrentDateTime(), 'YYYY-MM-DD')); // '2025-06-10'
  console.log(deepCopy({ a: [1, 2] })); // Deep copied object
</script>
```

### Example

```javascript
// Node.js example
const utils = require('./stringUtils');
// or, once published: require('js-utils');
console.log(utils.truncateString('This is a long string', 10)); // 'This is a...'
console.log(utils.generateUniqueId()); // e.g., '1j4k5l2m-randomstring'
console.log(utils.generateTimeSlots('2025-06-10', '2025-06-12', 30, { days: [0, 6], hours: { start: '09:00', end: '17:00' } }, 'America/New_York'));
```

## Contributing

Contributions are welcome to enhance `JSUtils`! Add new utilities, optimize code, write tests, or improve documentation.

### How to Contribute

1. **Fork the Repository**: Click "Fork" on GitHub.
2. **Clone Your Fork**:

   ```bash
   git clone https://github.com/vishalmeena2211/js-utils.git
   ```

3. **Create a Branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**: Ensure:
   - CamelCase function names.
   - JSDoc comments for documentation.
   - Robust error handling.
   - Minimal dependencies (Moment.js for date utilities only).
5. **Test Changes**: Verify in Node.js and browsers.
6. **Commit and Push**:

   ```bash
   git commit -m "Add your descriptive commit message"
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**: Submit a PR with a clear description.

### Contribution Ideas

- New utility functions (e.g., math, file handling).
- Unit tests with Jest or Mocha.
- Performance optimizations.
- TypeScript definitions.
- Real-world use case examples.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contact

Open a GitHub issue or contact [meenavishal@gmail.com](meenavishal@gmail.com) for questions or suggestions.

---

Thank you for using and contributing to `JSUtils`!