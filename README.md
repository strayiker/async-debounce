[![Version](https://badgen.net/npm/v/@sadbox/async-debounce)](https://www.npmjs.com/package/@sadbox/async-debounce) [![License](https://badgen.net/npm/license/@sadbox/async-debounce)](https://www.npmjs.com/package/@sadbox/async-debounce) [![Dependencies](https://badgen.net/david/dep/strayiker/async-debounce)](https://www.npmjs.com/package/@sadbox/async-debounce)

# Async Debounce

Debounce async functions.

## Install

`yarn add @sadbox/async-debounce`

or

`npm install -S @sadbox/async-debounce`

## Usage

```javascript
import debounce from '@sadbox/async-debounce';
import asyncPrint from './asyncPrint';
import sleep from './sleep';

const fn = b =>
  new Promise((resolve, reject) =>
    setTimeout(() => (b ? resolve(b) : reject(b)), 50)
  );

// We set 50ms timeout for the debouncing function and 50ms for the 'fn' function
// As a result, we should wait 100ms for the result
const debounced = debounce(fn, 50);

asyncPrint(debounced(false));
sleep(100);
// after 100ms promise will be rejected and 'reject: false' will be printed

asyncPrint(debounced(true));
sleep(75);
asyncPrint(debounced(true));
// after 75ms first promise will be canceled and last result will be repeated
// so 'reject: false' will be printed again

// after 100ms second promise will be resolved with 'resolve: true'
```

## API

```javascript
debounce(fn: Function, timeout: Number, [defaultValue: Any]): Function;
```

`defaultValue` - The value to be returned when a promise is canceled before the original function is resolved/rejected first time.
