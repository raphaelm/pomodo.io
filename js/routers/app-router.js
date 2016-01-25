var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('lodash');
Backbone.$ = $;

var views = {
	app: require('./../views/app.js'),
	sidebar: require('./../views/sidebar.js'),
	controls: require('./../views/controls.js'),
	count: require('./../views/count.js'),
	countdown: require('./../views/countdown.js'),
	notification: require('./../views/notification.js'),
	toggleNotification: require('./../views/toggle-notifications.js')
};

var models = {
	timer: require('./../models/timer.js'),
	notification: require('./../models/notification.js')
};

module.exports = Backbone.Router.extend({
	routes: {
		'': "home"
	},
	
	initialize: function(callback){
		this.timer = new models.timer();
		this.pomodoNotification = new models.notification();
		callback();
	},

	home: function() {
		new views.app({
			el: "[data-region='app-view']",
			model: this.timer
		}).render().el;

		$('[data-region="sidebar"]').html(new views.sidebar({
			model: this.timer
		}).render().el);

		$('[data-region="controls"]').html(new views.controls({
			model: this.timer
		}).render().el);

		$('[data-region="countdown"]').html(new views.countdown({
			model: this.timer
		}).render().el);

		$('[data-region="count"]').html(new views.count({
			model: this.timer
		}).render().el);

		$('[data-region="notification"]').html(new views.notification({
			model: this.pomodoNotification
		}).render().el);

		$('[data-region="toggle-notifications"]').html(new views.toggleNotification({
			model: this.pomodoNotification
		}).render().el);
	}
});
