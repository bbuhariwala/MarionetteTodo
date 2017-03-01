var Backbone = require('backbone');

var ToDo = Backbone.Model.extend({
	defaults: {
		id: '',
		assignedBy: '',
		taskDescription: '',
		dateCreated: '',
		dateModified: '',
		status: ''
	},
	
	validate: function(attrs){
		var errors ={};
		var hasError = false;
		if(!attrs.assignedBy){
			errors.assignedBy = "Text must be set";
			hasError = true;
		}
		if(!attrs.taskDescription){
			errors.text = "Assignee must be set";
			hasError = true;
		}
		if (!attrs.assignedBy.replace(/\s/g, '').length) {
			errors.assignee = "Assignee must be set";
			hasError = true;
		}
		if (!attrs.taskDescription.replace(/\s/g, '').length) {
			errors.text = "Text must be set";
			hasError = true;
		}
		
		if(hasError){
			return errors;
		}
	}
});
module.exports = ToDo;