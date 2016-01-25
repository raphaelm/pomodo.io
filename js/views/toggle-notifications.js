var Backbone = require('backbone');
var $ = require('jquery');
var Handlebars = require("hbsfy/runtime");
Backbone.$ = $;

module.exports = Backbone.View.extend({

	initialize: function() {
		this.model.fetch();
	},
	render: function(){
		var template = require('../../templates/_toggle-notifications.html');
		this.$el.html(template({
			browserEnabled: this.model.get('browserEnabled'),
			audioEnabled: this.model.get('audioEnabled'),
			isBrowserNotificationsAllowed: this.isBrowserNotificationsAllowed(),
			canShowBrowserNotifications: this.canShowBrowserNotifications,
			canAudioNotifications: this.canAudioNotifications(),
			canLocalStorage: this.canLocalStorage()
		}));
		return this;
	},
	events: {
		'click .js-browser-toggle': 'toggleBrowser',
		'click .js-audio-toggle': 'toggleAudio'
	},

	toggleBrowser: function(ev) {
		if (this.model.get('browserEnabled')) {
			this.model.disableBrowserNotifications();
			this.render();
		} else {
			window.Notification.requestPermission(function (status) {
				if (status === 'granted') {
					this.model.enableBrowserNotifications();
					this.render();
				} else {
					this.model.disableBrowserNotifications();
					this.render();
				}
			}.bind(this));
		}
	},
	toggleAudio: function() {
		if (this.model.get('audioEnabled')) {
			this.model.disableAudioNotifications();
		}
		else {
			this.model.enableAudioNotifications();
		}
	},

	/**
	 * Check for notification/storage availability
	 */
	canShowBrowserNotifications: function() {
		return ('Notification' in window);
	},
	canAudioNotifications: function() {
		return ('Audio' in window);
	},
	canLocalStorage: function() {
		return ('localStorage' in window);
	},

	isBrowserNotificationsAllowed: function() {
		if (this.canShowBrowserNotifications()) {
			return window.Notification.permission != 'denied';
		}
		return false;
	}

});
