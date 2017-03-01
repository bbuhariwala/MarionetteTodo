var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var FailureAlertView = Marionette.LayoutView.extend({
	el: '#alert',
	initialize: function(options) {
		console.log("Failure Alert view initialized.");
		this.options = options;
	},
	template: require("../templates/failureAlert.html"),
	templateHelpers: function() {
		return {
			message:this.options.alertMessage
		}
	}
	
});
module.exports = FailureAlertView;	
