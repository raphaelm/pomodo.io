var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var attachFastClick = require('fastclick');

var AppRouter = require('./routers/app-router.js');

function startApp() {
	var router = new AppRouter(function() {
		Backbone.history.start({
			pushState: true
		});
	});
}

startApp();

$(document).ready(function() {
	attachFastClick(document.body);
});
