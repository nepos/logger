/*eslint no-console:0*/
/*eslint no-restricted-globals:0*/

(function() {

	const Logger = function() {
		const my = {};
		const that = function() {
			return that.log.apply(null, arguments);
		};

		my.construct = function(name, style) {
			my.name = name.toUpperCase() || 'unnamed';
			my.style = my.parseStyle(style);
			my.muted = true;
			my.isTesting = !_.isUndefined(window.jasmine);
			my.testLog = false;
			my.reportErrorsToRaven = !_.isUndefined(window.Raven);
			return that;
		};

		my.parseStyle = function(style) {
			if(style && style.indexOf(':') === -1) {
				return 'color:'+style;
			}
			if(!style) {
				return 'color:silver';
			}
			return style;
		};

		my.getIdentifier = function() {
			if(my.isTesting) {
				return ['['+my.name+']'];
			}
			return ['%c['+my.name+']', my.style];
		};

		my.argsToString = function(aArguments) {
			let str = '';
			_.each(aArguments, arg => {
				if(_.isObject(arg) || _.isArray(arg)) {
					str+= JSON.stringify(arg);
				}
				else {
					str+= arg;
				}
			});
			return str;
		};

		that.log = function(...args) {
			if(my.isTesting && !my.testLog) {
				return that;
			}
			if(!my.muted) {
				console.log.apply(console, my.getIdentifier().concat(args));
			}
			return that;
		};

		that.warn = function(...args) {
			if(my.isTesting && !my.testLog) {
				return that;
			}
			if(my.showWarnings || !my.muted) {
				console.warn.apply(console, my.getIdentifier().concat(args));
			}
			return that;
		};

		that.error = function(...args) {
			if(my.isTesting && !my.testLog) {
				return that;
			}
			console.error.apply(console, my.getIdentifier().concat(args));

			if(reportErrorsToRaven) {
				//report to raven also
				Raven.captureException(new Error(my.argsToString(args)));
			}
			return that;
		};

		that.trace = function() {
			if(my.isTesting && !my.testLog) {
				return that;
			}
			if(!my.muted) {
				console.trace(my.name+' trace');
			}
			return that;
		};

		that.info = function(...args) {
			if(my.isTesting && !my.testLog) {
				return that;
			}
			if(!my.muted) {
				console.info.apply(console, my.getIdentifier().concat(args));
			}
			return that;
		};

		that.mute = function() {
			my.muted = true;
			return that;
		};

		that.unmute = function() {
			my.muted = false;
			return that;
		};

		that.on = function() {
			my.muted = false;
			return that;
		};

		that.showWarnings = function() {
			my.showWarnings = true;
			return that;
		};

		that.logOnTest = function() {
			my.testLog = true;
			my.muted = false;
			return that;
		};

		return my.construct.apply(null, arguments);
	};

	window.Logger = Logger;

});