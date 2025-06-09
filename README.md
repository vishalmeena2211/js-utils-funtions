JSUtils
A comprehensive, open-source JavaScript library providing essential utility functions for daily web development projects. This repository includes a collection of robust, reusable utilities for string manipulation, date/time operations (powered by Moment.js), and general-purpose tasks like deep copying, debouncing, and data validation. Designed for both Node.js and browser environments, JSUtils is perfect for building reliable applications, from web UIs to backend services.
About the Repository
JSUtils is a versatile utility library aimed at simplifying common JavaScript tasks in projects like form validation, data processing, scheduling, and performance optimization. The library is organized into modular files, each focusing on a specific category of utilities, with robust error handling and clear documentation. Whether you're working on a hotel management system, e-commerce platform, or any JavaScript project, these utilities streamline development and enhance code reliability.
Key Features

Comprehensive Utilities: Covers string manipulation, date/time operations, and general-purpose functions like deep copying and throttling.
Modular Structure: Organized into separate files (stringUtils.js, momentUtils.js, advancedMomentUtils.js, projectUtils.js) for easy integration.
Robust Error Handling: Functions validate inputs and return safe defaults (e.g., empty strings, null) for invalid cases.
Cross-Environment Support: Compatible with Node.js and browsers (with minor adjustments for global scope).
Well-Documented: JSDoc comments provide clear usage instructions for each function.
Dependency Management: Minimal dependencies (Moment.js and Moment TimeZone for date utilities; none for others).

Included Utilities
The repository contains the following utility categories:
String Utilities (stringUtils.js)

capitalizeString: Capitalizes the first letter of a string.
truncateString: Truncates a string with an ellipsis.
normalizeString: Removes extra spaces and optionally lowercases.
slugifyString: Generates URL-friendly slugs.
isValidEmail: Validates email addresses.
extractRegexMatches: Extracts regex matches from a string.
dynamicReplace: Replaces substrings dynamically.
toCamelCase: Converts strings to camelCase.
formatString: Formats strings with placeholders.
containsSubstrings: Checks for substrings.
chunkString: Splits strings into fixed-length chunks.
stripHtmlTags: Removes HTML tags.
encodeToBase64 / decodeFromBase64: Handles Base64 encoding/decoding.
generateRandomString: Creates random alphanumeric strings.
countOccurrences: Counts substring or regex occurrences.

Date/Time Utilities (momentUtils.js)

getCurrentDateTime: Gets the current date/time.
parseDateString: Parses date strings.
formatDate: Formats dates with custom patterns.
addTime / subtractTime: Modifies dates by time units.
isBeforeDate / isAfterDate: Compares dates.
setTimezone: Converts dates to specific timezones (requires Moment TimeZone).
And more for parsing, formatting, and querying dates.

Advanced Date/Time Utilities (advancedMomentUtils.js)

generateRecurringEvents: Creates recurring event dates.
batchConvertTimezone: Converts multiple dates to a timezone.
getDateRangeIntersection: Finds overlapping date ranges.
splitDateRange: Splits ranges into chunks.
aggregateDateRanges: Calculates total duration of ranges.
getNextBusinessDay: Finds the next business day, skipping holidays.
generateTimeSlots: Generates available time slots with constraints.

General Utilities (projectUtils.js)

deepCopy: Deeply copies objects/arrays, handling circular references.
debounce / throttle: Limits function execution rates.
validateObject: Validates objects against a schema.
groupBy: Groups arrays by a key or function.
flattenArray: Flattens nested arrays.
retryWithBackoff: Retries async functions with exponential backoff.
parseQueryString / toQueryString: Handles query string parsing/generation.
deepMerge: Merges objects deeply.
generateUniqueId: Creates unique IDs.
sanitizeHtmlString: Escapes HTML characters.
chunkArray: Splits arrays into chunks.
memoize: Caches function results.
deepEqual: Compares values deeply.

Usage
Node.js

Clone the repository or install via npm (once published):git clone https://github.com/your-username/js-utils.git

ornpm install js-utils


Import specific utilities:const { capitalizeString, deepCopy, generateRecurringEvents } = require('js-utils');
console.log(capitalizeString('hello world')); // 'Hello world'
console.log(deepCopy({ a: 1, b: { c: 2 } })); // Deep copied object
console.log(generateRecurringEvents('2025-06-10', '2025-06-20', 'days', 2));



Browser

Include the desired utility file(s) in your HTML:<script src="stringUtils.js"></script>
<script src="momentUtils.js"></script>
<script src="advancedMomentUtils.js"></script>
<script src="projectUtils.js"></script>

Note: For date/time utilities, include Moment.js and Moment TimeZone:<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.46/moment-timezone-with-data.min.js"></script>


Use functions globally:console.log(capitalizeString('hello world')); // 'Hello world'
console.log(formatDate(getCurrentDateTime(), 'YYYY-MM-DD')); // '2025-06-10'
console.log(deepCopy({ a: [1, 2] })); // Deep copied object



Example
// Node.js example
const utils = require('js-utils');
console.log(utils.truncateString('This is a long string', 10)); // 'This is a...'
console.log(utils.generateUniqueId()); // e.g., '1j4k5l2m-randomstring'
console.log(utils.generateTimeSlots('2025-06-10', '2025-06-12', 30, { days: [0, 6], hours: { start: '09:00', end: '17:00' } }, 'America/New_York'));

Installation
Clone the repository:
git clone https://github.com/your-username/js-utils.git

For Node.js, copy the desired .js files to your project and import them. For browsers, include via <script> tags or use a bundler like Webpack. For date/time utilities, install Moment.js and Moment TimeZone:
npm install moment moment-timezone

Contributing
We welcome contributions to make JSUtils even better! Add new utilities, optimize existing ones, write tests, or improve documentation.
How to Contribute

Fork the Repository: Click the "Fork" button on GitHub.
Clone Your Fork:git clone https://github.com/your-username/js-utils.git


Create a Branch:git checkout -b feature/your-feature-name


Make Changes: Add or improve functions, ensuring:
CamelCase naming for functions.
JSDoc comments for documentation.
Robust error handling for edge cases.
Minimal dependencies (only Moment.js for date utilities).


Test Your Changes: Verify in Node.js and browser environments.
Commit and Push:git commit -m "Add your descriptive commit message"
git push origin feature/your-feature-name


Open a Pull Request: Submit a PR with a clear description of your changes.

Contribution Ideas

Add new utility functions (e.g., math utilities, file handling).
Write unit tests using Jest or Mocha.
Optimize performance of existing functions.
Add TypeScript definitions.
Create examples or demos for real-world use cases (e.g., form validation, API integration).

License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions, suggestions, or issues, open a GitHub issue or contact the maintainer at your-email@example.com.

Thank you for using and contributing to JSUtils! Let's build a robust utility library together.
