var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var SuccessAlertView = Marionette.LayoutView.extend({
	el: '#alert',
	initialize: function(options) {
		console.log("Success Alert view initialized.");
		this.options = options;
	},
	template: require("../templates/successAlert.html"),
	templateHelpers: function() {
		return {
			message:this.options.alertMessage
		}
	}
	
});
module.exports = SuccessAlertView;