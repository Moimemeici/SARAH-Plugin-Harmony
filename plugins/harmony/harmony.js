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

exports.action = function(data, callback, config, SARAH){

	// Fetch plugin configuration
	config = config.modules.harmony;

	// Check plugin configuration
	if (!config.login || !config.ip){
		callback({ 'tts': 'Vous devez configurer le plugin Harmony avec votre identifiant et mot de passe Logitek' });
		return;
	}

	// Hub object for ease of use
	var hub = {
		"login": config.login,
		"password": config.password,
		"ip": config.ip
	};

	console.log('Harmony login: ' + config.login + ' on ip: ' + config.ip);

	// Check SARAH action
	if (data.action == "status") {
		debug('action: status');
		getStatus(hub, callback);
	} else if (data.action == "list") {
		debug('action: list');
		getActivities(hub, callback);
	} else if (data.action == "startactivity") {
		debug('action: startactivity');
		if (data.activity) {
			debug('activity: ' + data.activity);
			startActivity(data.activity, hub, callback);
		} else {
			callback({ 'tts': "Activité non renseignée" });
		}
	} else if (data.action == "turnoff") {
		debug('action: turnoff');
		turnOff(hub, callback);
	} else {
		callback({ 'tts': "Je n'ai rien fait" });
	}
};

var debug = require('debug')('plugin:harmony');

/**
 * Get Harmony hub status.
 */
var getStatus = function(hub, callback) {
	debug('getStatus()');
	console.log('Checking Harmony status...');

	var client = require('./harmonylib');

	client.checkState(hub, function() {
		console.log('Hub is off');
		callback({ 'tts': "Harmonie est éteinte" });
	}, function() {
		console.log('Hub is on');
		callback({ 'tts': "Harmonie est allumée" });
	}, function(error) {
		console.log('error: ' + error);
		callback({ 'tts': "erreur" });
	});
};

/**
 * Get list of Harmony activities.
 */
var getActivities = function(hub, callback) {
	debug('getActivities()');
	console.log('Getting Harmony activities...');

	var client = require('./harmonylib');

	client.listActivities(hub, function(activities) {
		console.log('List of Harmony activities');
		callback({ 'tts': "Liste des activités non implémentée" });
	}, function(error) {
		console.log('error: ' + error);
		callback({ 'tts': "erreur" });
	});
};

/**
 * Start Harmony activity given by activity name.
 */
var startActivity = function(activity, hub, callback) {
	debug('startActivity(' + activity + ')');
	console.log('Starting Harmony activity ' + activity + '...');

	var client = require('./harmonylib');

	client.startActivity(hub, activity, function() {
		console.log('Harmony activity started');
		callback({ 'tts': "Démarrage de l'activité " + activity });
	}, function(error) {
		console.log('error: ' + error);
		callback({ 'tts': "erreur" });
	});
};

/**
 * Turn off current activity (Power off).
 */
var turnOff = function(hub, callback) {
	debug('turnOff()');
	console.log('Turning off Harmony...');

	var client = require('./harmonylib');

	client.turnOff(hub, function() {
		console.log('Harmony turned off');
		callback({ 'tts': "Arrêt de Harmony" });
	}, function(error) {
		console.log('error: ' + error);
		callback({ 'tts': "erreur" });
	});
};
