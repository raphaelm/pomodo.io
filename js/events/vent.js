var Backbone = require('backbone');
var _ = require('lodash');
var _vent = null;
/**
 * This is a module that allows events to be triggered anywhere.
 *
 * Include: var _vent = require('./../events/vent.js').shared();
 * _vent.trigger('EventName', {
 *    data: 'here'
 * });
 * _vent.on('EventName', function);
 */

module.exports = {
	shared: function () {
		if (!_vent) {
			_vent = _.extend({}, Backbone.Events);
		}
		return _vent;
	}
}
