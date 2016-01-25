var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jquery');
var Handlebars = require("hbsfy/runtime");
Backbone.$ = $;


module.exports = Backbone.View.extend({
	className: 'sidebar js-sidebar',

	render: function() {
		var template = require('../../templates/_sidebar.html');
		this.$el.html(template());
		return this;
	}

});
