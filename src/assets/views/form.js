var Marionette = require('backbone.marionette');

var FormView = Marionette.LayoutView.extend({ //ItemView
	tagName:'form',
	template: require('../templates/form.html'),
	
	triggers: {
		submit: 'add:todo:item'
	},
	
	ui: {
		assignedBy: '#id_assignedBy',
		taskDescription: '#id_taskDescription'
	},
	
});
module.exports = FormView;
