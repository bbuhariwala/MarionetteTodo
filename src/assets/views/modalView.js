var Marionette = require('backbone.marionette');

var CompleteSuccess = Marionette.LayoutView.extend({
	el: '#myModal',
	template: require("../templates/completeSuccess.html")	
});
module.exports = CompleteSuccess;