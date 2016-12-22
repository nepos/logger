# Logger

I: WORLD, LOOK AT THIS LOGGER!!
World: Its the best logger I ever saw.


## Usage:

1. create your own logger from global namespace:
	`const log = Logger('serviceName')`

2. log something!
	`log('hello world');`

3. log an error
	`log.error('oh now, that failed')`

4. trace a log or error
	`log.error('this failed, but why?').trace()`

5. everything is a chain
	`log('hello').log('whats up?').error('oh now').trace().log('trace end');`



## Styling:

a) Use the default styling
	`const log = Logger('name');`

b) Set your favorit color
	`const log = Logger('name', 'blue');`

c) Go crazy with your css styling
	`const log = Logger('name', 'color:red;font-weight:bold');`

	e) switch on your logger
		```const log = Logger('name', 'color:red;font-weight:bold');
		log.on()```

   or

   `const log = Logger('name', 'color:red;font-weight:bold').on();`

f) switch on your logs in tests:
	`const log = Logger('name', 'color:red;font-weight:bold').logOnTest();`


## Behavior:

1. Switch your logger off by default!
2. Don't throw errors in intervals. Errors will be reported to sentry.
3. Use `logger.warn()` and the brand new function `showWarnings()` if you want to bother your colleagus for the right behavior.


## Todo:

Its a the first version, extracted from our frontend projects.

- Make compatible with Node and use it there
- Remove dependencies like lodash, window, Raven and jasmine
- Extract tests also