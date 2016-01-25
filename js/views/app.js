var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jquery');
var Handlebars = require("hbsfy/runtime");
Backbone.$ = $;

module.exports = Backbone.View.extend({
	events: {
		'click .js-sidebar-toggle': 'toggleSidebar'
	},
	initialize: function() {
		this.sidebarToggle = $('.js-sidebar-toggle');
		this.container = $('.js-container');
	},
	render: function() {
		this.toggleBreakStyle();
		return this;
	},

	toggleSidebar: function(ev) {
		$('.js-sidebar').toggleClass('active');
		this.container.toggleClass('js-sidebar-open');

		//Swap over the ? and X text within the toggle.
		var oldText = this.sidebarToggle.text();
		this.sidebarToggle.text(this.sidebarToggle.attr('data-text-swap'));
		this.sidebarToggle.attr('data-text-swap', oldText);

		ev.preventDefault();
	},

	toggleBreakStyle: function() {
		if (this.model.get('isOnBreak')) {
			this.$el.addClass('is-on-break');
		}
	}

});
