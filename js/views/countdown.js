var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

module.exports = Backbone.View.extend({
	className: 'countdown island',

	initialize: function() {
		this.listenTo(this.model, 'change:time', function() {
			this.render();
			this.updateTitleTime(this.model.get('time'));
		});
	},
    render: function() {
	    var time = this.model.get('time');

	    var template = require('../../templates/_countdown.html');
	    this.$el.html(template({
		    minutes: this.parseMinutes(time),
		    seconds: this.parseSeconds(time)
	    }));

        return this;
    },

	/**
	 * If the minute/seconds is less than 10 it will pad out the time with a '0'
	 * resulting in: 00:05 as opposed to: 0:5
	 */
	parseTime: function(time) {
		time = time < 10 ? '0' + time : time;
		return time;
	},
	parseMinutes: function(time) {
		time = parseInt(time / 60);
		return this.parseTime(time);
	},
	parseSeconds: function(time) {
		time = parseInt(time % 60);
		return this.parseTime(time);
	},

	updateTitleTime: function(time) {
		$('title').html(this.parseMinutes(time) + ':' + this.parseSeconds(time) + ' Pomodo');
	}
});
