# Logger

**I:** WORLD, LOOK AT THIS LOGGER!!

**World:** Its the best logger I ever saw.


## Usage:

1. create your own logger from global namespace:
	`const log = Logger('serviceName')`

2. log something!
	`log('hello world');`

3. log an error
	`log.error('oh no, that failed')`

4. trace a log or error
	`log.error('this failed, but why?').trace()`

5. everything is a chain
	`log('hello').log('whats up?').error('oh now').trace().log('trace end');`

Remember: Logs are muted by default, that means only errors are shown. Switch your logger while developing

	log.on();

	//alternativ log.unmute();

You can tell the logger to show warnings always

	log.showWarnings();

If you want your logs just when running test cases, say it

	log.logOnTest();


## Styling:

a) Use the default styling

	const log = Logger('name');

b) Set your favorit color

	const log = Logger('name', 'blue');

c) Go crazy with your css styling

	const log = Logger('name', 'color:red;font-weight:bold');


## Todo:

Its a the first version, extracted from our frontend projects.

- Make compatible with Node and use it there
- Remove dependencies like lodash, window, Raven and jasmine
- Extract tests also
- Add version
- Introduce DEV branch
- Control the mute from outside, like NODE_ENV or localstorage configuration
