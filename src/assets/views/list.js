var Marionette = require('backbone.marionette');
var SuccessAlertView = require("./successAlert");
var FailureAlertView = require("./failureAlert");
var CompleteSuccess = require("./modalView");
var TodoModel = require("../models/todo");

var ToDo = Marionette.LayoutView.extend({
	
	initialize: function(options){
		console.log('List View Initialized')
	},
	tagName: 'tr',
	template: require("../templates/todoitem.html"),
	templateHelpers: function(){
		return {
			notStartedChecker: function(){
				if(this.status === 'Not Started'){
					return true;
				}
				else{
					return false;
				}
			},
			inProgressChecker: function() {
				if(this.status === 'In Progress'){
					return true;
				}
				else{
					return false;
				}
			},
			completeChecker: function() {
				if(this.status === 'Complete'){
					return true;
				}
				else{
					return false;
				}
			}
		}
	},
	events: {
		'click .assignee': 'handleEditAssignee',
		'click .saveAssignee': 'handleSaveAssignee',
		'click .undoAssignee': 'handleUndoAssignee',
		'click .text': 'handleEditText',
		'click .saveText': 'handleSaveText',
		'click .undoText': 'handleUndoText',
		'change .todoStatus' :  'handleCompletionStatus'
	},
	modelEvents: {
		'change:status': 'statusChanged'
	},

	statusChanged: function(){
		console.log('Status Changed in List View. Triggering event for Parent');
		this.triggerMethod('update:stats','foo');
	},
	
	handleEditAssignee: function(){
		console.log("Handle Edit Assignee");
		this.$el.find(".assignee").prop("disabled",true);
		this.val = this.$el.find('.assigneeD').text();
		this.$el.find('.assigneeD').attr('contenteditable','true').focus();
	},
	handleSaveAssignee: function() {
		var current = this.$el.find('.assigneeD').text();
		var old = this.val;
		var attrib = this.$el.find('.assigneeD').attr('contenteditable');
		this.$el.find('.assigneeD').attr('contenteditable','false');
		if(current !== old && attrib === 'true'){
			var that = this;
			var todoModel = new TodoModel({
				'id': this.model.get('id'),
				'dateModified':this._getDate().toString(),
				'assignedBy':current,
				'taskDescription': this.model.get('taskDescription')
			});
			if(todoModel.isValid()){
				$.ajax({
					type: 'PUT',
					url: './webapi/todo/change/assignedby',
					contentType: 'application/json',
					dataType: 'text',
					data: JSON.stringify(todoModel),
					success: function(data){
						var successAlertView = new SuccessAlertView({alertMessage:"TODO Assigned By Field Updated & Saved Successfully!"});
						successAlertView.render();
						that.model.set({'dateModified':todoModel.attributes.dateModified});
						that.model.set({'assignedBy':todoModel.attributes.assignedBy});
						that.render();
						this.$el.find(".assignee").prop("disabled",false);
					},
					error: function(statusCode) {
						var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving-Server Error"});
						failureAlertView.render();
						that.$el.find('.assigneeD').text(old);
						this.$el.find(".assignee").prop("disabled",false);
					}
				});
			}
			else{
				var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving-Please enter assignee correctly"});
				failureAlertView.render();
				that.$el.find('.assigneeD').text(old);
				this.$el.find(".assignee").prop("disabled",false);
			}
		}
		else{
			var failureAlertView = new FailureAlertView({alertMessage:"Nothing to Save!"});
			failureAlertView.render();
			this.$el.find(".assignee").prop("disabled",false);
		}
	},
	
	 _getDate: function(){
		 var d = new Date();
		 return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
	 },
	 
	handleUndoAssignee: function() {
		var current = this.$el.find('.assigneeD').text();
		var old = this.val;
		var attrib = this.$el.find('.assigneeD').attr('contenteditable');
		this.$el.find('.assigneeD').attr('contenteditable','false');
		if(current !== old && attrib === 'true'){
			this.$el.find('.assigneeD').text(this.val);
			var successAlertView = new SuccessAlertView({alertMessage:"TODO Assignee Restored and Saved Successfully!"});
			successAlertView.render();
			this.$el.find(".assignee").prop("disabled",false);
		}
		else{
			var failureAlertView = new FailureAlertView({alertMessage:"No changes applied!"});
			failureAlertView.render();
			this.$el.find(".assignee").prop("disabled",false);
		}
	},
	handleEditText: function() {
		this.$el.find(".text").prop("disabled",true);
		this.textval = this.$el.find('.textD').text();
		this.$el.find('.textD').attr('contenteditable','true').focus();
	},
	handleSaveText: function() {
		var current = this.$el.find('.textD').text();
		var old = this.textval;
		var attrib = this.$el.find('.textD').attr('contenteditable');
		this.$el.find('.textD').attr('contenteditable','false');
		if(current !== old && attrib === 'true'){
			var that = this;
			var todoModel = new TodoModel({
				'id': this.model.get('id'),
				'dateModified':this._getDate().toString(),
				'assignedBy': this.model.get('assignedBy'),
				'taskDescription':current
			});
			if(todoModel.isValid()){
				$.ajax({
					type: 'PUT',
					url: './webapi/todo/change/description',
					contentType: 'application/json',
					dataType: 'text',
					data: JSON.stringify(todoModel),
					success: function(data){
						var successAlertView = new SuccessAlertView({alertMessage:"TODO Task Description Updated & Saved Successfully!"});
						successAlertView.render();
						that.model.set({'dateModified':todoModel.attributes.dateModified});
						that.model.set({'taskDescription':todoModel.attributes.taskDescription});
						that.render();
						that.$el.find(".text").prop("disabled",false);
					},
					error: function(statusCode) {
						var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving-Server Issue"});
						failureAlertView.render();
						that.$el.find('.textD').text(old);
						that.$el.find(".text").prop("disabled",false);
					}
				});
			}
			else{
				var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving-Please enter Task Description correctly"});
				failureAlertView.render();
				that.$el.find('.textD').text(old);
				that.$el.find(".text").prop("disabled",false);
			}
		}
		else{
			var failureAlertView = new FailureAlertView({alertMessage:"Nothing to Save!"});
			failureAlertView.render();
			this.$el.find(".text").prop("disabled",false);
		}
	},
	handleUndoText:  function() {
		var current = this.$el.find('.textD').text();
		var old = this.textval;
		var attrib = this.$el.find('.textD').attr('contenteditable');
		this.$el.find('.textD').attr('contenteditable','false');
		if(current !== old && attrib === 'true'){
			this.$el.find('.textD').text(this.textval);
			var successAlertView = new SuccessAlertView({alertMessage:"TODO Text Restored and Saved Successfully!"});
			successAlertView.render();
			this.$el.find(".text").prop("disabled",false);
		}
		else{
			var failureAlertView = new FailureAlertView({alertMessage:"No changes applied!"});
			failureAlertView.render();
			this.$el.find(".text").prop("disabled",false);
		}
	},

	handleCompletionStatus: function() {
		var newStatus = this.$el.find('.todoStatus').val();
		if(newStatus === 'Not Started'){
			this.$el.find('.complete').css('display','none');
			this.$el.find('.inProgress').css('display','none');
			this.$el.find('.notStarted').css('display','block');
		}
		if(newStatus === 'In Progress'){
			this.$el.find('.complete').css('display','none');
			this.$el.find('.inProgress').css('display','block');
			this.$el.find('.notStarted').css('display','none');
		}
		if(newStatus === 'Complete'){;
			this.$el.find('.complete').css('display','block');
			this.$el.find('.inProgress').css('display','none');
			this.$el.find('.notStarted').css('display','none');
			this.allCompleteChecker();
		}	
		//AJAX CALL TO UPDATE STATUS
		var that = this;
		var todoModel = new TodoModel({
			'id': this.model.get('id'),
			'dateModified':this._getDate().toString(),
			'status':newStatus
		});
		$.ajax({
			type: 'PUT',
			url: './webapi/todo/change/status',
			contentType: 'application/json',
			dataType: 'text',
			data: JSON.stringify(todoModel),
			success: function(data){
				var successAlertView = new SuccessAlertView({alertMessage:"TODO Status Updated to "+todoModel.attributes.status+" & Saved Successfully!"});
				successAlertView.render();
				that.model.set({'dateModified':todoModel.attributes.dateModified});
				that.model.set({'status':todoModel.attributes.status});
				that.render();
			},
			error: function(statusCode) {
				var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving"});
				failureAlertView.render();
			}
		});
		//END OF AJAX CALL
	},
	
	allCompleteChecker: function(){
		var count = 0;
		var completeCount = 0;
		$("#todoList tbody tr").each(function(i,row) {
				count++;
				var x = $(this).find('.complete').css('display');
				if(x === 'block'){
					completeCount++;;	
				}
		});
		if(count === completeCount){
			var completeSuccess = new CompleteSuccess();
			completeSuccess.render();
			$('#myModal').modal('show');
		}
	}
});

var TodoList = Marionette.CompositeView.extend({
	template: require("../templates/todotablelist.html"),
	childView: ToDo,
	childViewContainer: 'tbody'
});

module.exports = TodoList;