/*
 * Logitech Harmony plugin for S.A.R.A.H.
 * https://github.com/hobbe/SARAH-Plugin-Harmony
 *
 * Licensed under DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *
 * This plugin relies on Manuel Alabor's harmonyhubjs-client library for node.js
 * https://github.com/swissmanu/harmonyhubjs-client
 *
 * You may use node debug module; set environment variable DEBUG=*
 */

var debug = require('debug')('plugin:harmony:harmonylib');
var harmony = require('harmonyhubjs-client');

/**
 * Check Harmony state.
 * @param hub hub object { login, password, hub_ip }
 * @param ifOff callback if hub is off
 * @param ifOn callback if hub is on
 * @param onError callback on error
 */
function checkState(hub, ifOff, ifOn, onError) {
	debug('checkState()');
	var promise = harmony(hub.login, hub.password, hub.ip);

	promise.then(function(client) {
		debug('successful client creation');
		client.isOff().then(function(off) {
			debug('successful client isOff()');

			client.end();
			if(off) {
				if (ifOff) {
					ifOff();
				}
			} else {
				if (ifOn) {
					ifOn();
				}
			}
		}, function(error) {
			debug('error on client isOff()');
			client.end();
			if (onError) {
				onError(error);
			}
		});
	}, function(error) {
		debug('error on client creation');
		if (onError) {
			onError(error);
		}
	});
}

/**
 * List activities.
 * @param hub hub object { login, password, hub_ip }
 * @param onSuccess callback on success
 * @param onFailure callback on failure
 */
function listActivities(hub, onSuccess, onFailure) {
	debug('listActivities()');
	var promise = harmony(hub.login, hub.password, hub.ip);

	promise.then(function(client) {
		debug('successful client creation');

		// TODO: to be implemented

		client.end();
		if (onSuccess) {
			onSuccess();
		}
	}, function(error) {
		if (onError) {
			onError(error);
		}
	});
}

/**
 * Start an activity in the Harmony remote.
 * @param hub hub object { login, password, hub_ip }
 * @param activityName name of activity to start
 * @param onSuccess callback on success
 * @param onFailure callback on failure
 */
function startActivity(hub, activityName, onSuccess, onError) {
	debug('startActivity()');
	var promise = harmony(hub.login, hub.password, hub.ip);

	promise.then(function(client) {
		debug('successful client creation');

		client.getActivities().then(function(activities) {
			activities.some(function(activity) {
				if (activity.label === activityName) {
					var id = activity.id;
					debug('activity ID for ' + activityName + ': ' + id);
					console.log('Starting activity ' + activityName);
					client.startActivity(id);
					client.end();

					if (onSuccess) {
						onSuccess();
					}
					return true;
				}
				return false;
			});
		}, function(error) {
			debug('error on client getActivities()');
			client.end();
			if (onError) {
				onError(error);
			}
		});
	}, function(error) {
		debug('error on client creation');
		if (onError) {
			onError(error);
		}
	});
}

/**
 * Turn off current activity on remote.
 * @param hub hub object { login, password, hub_ip }
 * @param onSuccess callback on success
 * @param onFailure callback on failure
 */
function turnOff(hub, onSuccess, onError) {
	debug('turnOff()');
	var promise = harmony(hub.login, hub.password, hub.ip);

	promise.then(function(client) {
		debug('successful client creation');
		console.log('Turning Harmony off');
		client.turnOff();
		client.end();
		if (onSuccess) {
			onSuccess();
		}
	}, function(error) {
		debug('error on client creation');
		if (onError) {
			onError(error);
		}
	});
}

/*
 * Exports.
 */

exports.checkState = checkState;
exports.listActivities = listActivities;
exports.startActivity = startActivity;
exports.turnOff = turnOff;
