var Backbone = require('backbone');
var _ = require('lodash');
Backbone.LocalStorage = require("backbone.localstorage");
var $ = require('jquery');
Backbone.$ = $;
var _vent = require('./../events/vent.js').shared();

module.exports = Backbone.Model.extend({
	initialize: function() {
		this.fetch();
		this.bind('change', function(){ this.save(); });
	},
	defaults: {
		id: 1, //required for local storage
		time: 1500, //Time remaining in seconds (1500 === 25minutes)
		count: 0, //how many iterations they've done (0-4)
		totalCount: 0, //how many complete cycles they have done (4 pomodoros + 1 long break)
		isOnBreak: false,
		isLastCycle: false //Flagged up by setLongBreak(), used to trigger a reset
	},
	localStorage: new Backbone.LocalStorage('PomTimer'),

	countdown: function() {
		this.intervalID = setInterval(function() {
			var time = this.get('time'),
				count = this.get('count'),
				isOnBreak = this.get('isOnBreak');

			/**
			 * If we're on the last cycle, which is triggered by setLongBreak()
			 * AND the time, minus one tick (as we are on a new tick, we will miss the last one)
			 * Is 0. We have finished Pomodoro.
			 */
			if (this.get('isLastCycle') && (time - 1) === 0) {
				this.set('time', this.get('time') - 1); //dirty hack to show 00:00 on the FE when pomo ends
				this.set('totalCount', this.get('totalCount') + 1);
				this.cancelCountdown();
				this.onlyAllowReset();
				_vent.trigger('NotificationChanged', {
					message: 'Pomodoro finished!'
				});
				return;
			}

			/**
			 * If we haven't finished and timer is still greater than 1,
			 * Continue counting down.
			 */
			if (time > 1) {
				this.set('time', (time - 1));
			}

			/**
			 * If the timer has finished and we're on a break, clear the notification
			 * and reset the timer.
			 */
			else if (isOnBreak) {
				this.resetTimer();
				this.toggleDisabledState();
				this.set('isOnBreak', false);
				_vent.trigger('NotificationChanged', {
					message: 'Break finished!'
				});
				_.delay(function() {
					_vent.trigger('NotificationChanged', {
						message: null
					})
				}, 5000);
				this.toggleBreakStyle();
			}
			/**
			 * Otherwise, reset the timer and increase our iteration count.
			 * As we've done a work iteration, check what break type we need.
			 * And set up the correct timings/flags.
			 */
			else {
				this.resetTimer();
				this.toggleDisabledState();

				if (count === 3) {
					this.setLongBreak();
				} else {
					this.setShortBreak();
				}
			}
		}.bind(this), 1000)
	},

	toggleDisabledState: function() {
		$('.js-start').attr('disabled', false);
		$('.js-pause').attr('disabled', true);
	},
	onlyAllowReset: function() {
		$('.js-start').attr('disabled', true);
		$('.js-pause').attr('disabled', true);
		$('.js-reset').attr('disabled', false);
	},

	resetToDefaults: function() {
		this.cancelCountdown();
		this.set({
			time: this.defaults.time,
			count: this.defaults.count,
			isOnBreak: this.defaults.isOnBreak,
			isLastCycle: this.defaults.isLastCycle
		});
	},
	resetTimer: function() {
		this.cancelCountdown();
		this.resetTime();
	},
	resetTime: function() {
		this.set('time', this.defaults.time);
	},
	resetCount: function() {
		this.set('count', 0);
	},
	cancelCountdown: function() {
		clearInterval(this.intervalID);
	},

	setShortBreak: function() {
		this.set('time', 300);
		this.set('count', (this.get('count') + 1));
		this.set('isOnBreak', true);
		this.toggleBreakStyle();
		_vent.trigger('NotificationChanged', {
			message: 'Short break!'
		});
	},
	setLongBreak: function() {
		this.set('time', 600);
		this.set('count', this.get('count') + 1);
		this.set('isOnBreak', true);
		this.set('isLastCycle', true);
		this.toggleBreakStyle();
		_vent.trigger('NotificationChanged', {
			message: 'Long break!'
		});
	},
	toggleBreakStyle: function() {
		$('.js-body').toggleClass('is-on-break');
	}
});
