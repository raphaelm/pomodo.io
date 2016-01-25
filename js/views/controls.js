var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jquery');
var Handlebars = require("hbsfy/runtime");
Backbone.$ = $;
var _vent = require('./../events/vent.js').shared();

module.exports = Backbone.View.extend({
	className: 'actions island',

	events: {
		'click .js-start': 'start',
		'click .js-pause': 'pause',
		'click .js-reset': 'reset'
	},
	render: function() {
		var template = require('../../templates/_controls.html');
		this.$el.html(template());
		return this;
	},

	start: function(ev) {
		this.model.countdown();
		$(ev.target).prop('disabled', true);
		$('.js-pause').prop('disabled', false);
	},
	pause: function(ev) {
		this.model.cancelCountdown();
		$(ev.target).prop('disabled', true);
		$('.js-start').prop('disabled', false);
	},
	reset: function(ev) {
		this.model.resetToDefaults();
		this.model.toggleDisabledState();
		$('.js-body').removeClass('is-on-break');
		_vent.trigger('NotificationChanged', {
			message: null
		});
	}

});
