var Backbone = require('backbone');
Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
Backbone.$ = $;
var _vent = require('./../events/vent.js').shared();

module.exports = Backbone.Model.extend({
	initialize: function() {
		_vent.on('NotificationChanged', function(data) {
			this.set('message', data.message);
		}, this);

		this.bind('change', function(){ this.save(); });
	},
	defaults: {
		id: 1,
		browserEnabled: false,
		audioEnabled: true
	},

	localStorage: new Backbone.LocalStorage('PomNotification'),

	/**
	 * Getters/Setters
	 */
	enableBrowserNotifications: function() {
		this.set('browserEnabled', true);
	},
	disableBrowserNotifications: function() {
		this.set('browserEnabled', false);
	},
	enableAudioNotifications: function() {
		this.set('audioEnabled', true);
	},
	disableAudioNotifications: function() {
		this.set('audioEnabled', false);
	}
});
