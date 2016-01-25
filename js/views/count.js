var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
	className: 'count',

	initialize: function() {
		this.listenTo(this.model, 'change:count', this.render);
	},

	render: function() {
		this.$el.empty();
		var count = this.model.get('count'),
			limit = 4;

		for (var i = 0; i < limit; i++) {
			var className = (i < count) ? 'tomato--complete' : 'tomato';
			this.$el.append(
				'<div class="' + className + '"></div>'
			);
		}

		return this;
	}
});
