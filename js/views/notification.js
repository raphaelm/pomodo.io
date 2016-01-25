var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
Backbone.$ = $;

module.exports = Backbone.View.extend({
	className: 'notification',

	initialize: function() {
		this.model.fetch();

		this.listenTo(this.model, 'change:message', function(){
			this.render();
			this.desktopNotification();
			this.audioNotification();
		}, this);
	},
	render: function() {
		var template = require('../../templates/_notification.html');
		this.$el.html(template({
			message: this.model.get('message')
		}));
		return this;
	},

	/**
	 * Notification handlers
	 */
	desktopNotification: function() {
		if (this.model.get('browserEnabled') && this.model.get('message')) {
			var desktopNotification = new Notification('Pomodoro Timer', {
				body: this.model.get('message'),
				icon: './../../img/tomato--icon.png'
			});

			desktopNotification.onclick = function (ev) {
				window.focus();
			};

			_.delay(function () {
				desktopNotification.close();
			}, 5000);
		}
	},
	audioNotification: function() {
		if (this.model.get('audioEnabled') && this.model.get('message')) {
			if(document.createElement('audio').canPlayType('audio/mpeg')) {
				var audio = new Audio('audio/stepping_stones.mp3');
			} else {
				var audio = new Audio('audio/stepping_stones.ogg');
			}
			audio.play();
		}
	}

});
