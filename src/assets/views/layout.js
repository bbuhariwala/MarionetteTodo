var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var FormView = require('./form');
var ListView = require('./list');
var SuccessAlertView = require('./successAlert');
var FailureAlertView = require('./failureAlert');
var StatisticsView = require('./stats');
var Layout = Marionette.LayoutView.extend({
	el:	"#app-hook",
	initialize: function(){
		console.log("Lay Out view initialised");
	},
	
	template: require("../templates/layout.html"),
	 regions : {
		form: '.form',
		list: '.list',
		stats: '.stats'
	 },
	 
	 collectionEvents: {
		add: 'itemAdded',
	 },
	 
	 modelEvents: {
		invalid: 'invalidItem'
	 },
	
	 onShow: function(){
		var formView = new FormView({model: this.model});
		var listView = new ListView({collection: this.collection});
		var statisticsView = new StatisticsView({collection: this.collection});
		this.showChildView('form',formView);
		this.showChildView('list',listView);
		this.showChildView('stats',statisticsView);
	 },
	 
	 onChildviewUpdateStats: function(child){
		 this.showChildView('stats',new StatisticsView({collection: this.collection}));
	 },

	 onChildviewAddTodoItem: function(child) {
		var currentDate = this._getDate();
		this.model.set({
			assignedBy: child.ui.assignedBy.val(),
			taskDescription: child.ui.taskDescription.val(),
			dateCreated: currentDate.toString(),
			dateModified: currentDate.toString(),
			status: 'Not Started'
		});
		
		if(this.model.isValid()){
			var todoItem = this.model.pick('assignedBy','taskDescription','dateCreated','dateModified','status');
			var that = this;
			$.ajax({
				type: 'POST',
				url: './webapi/todo',
				contentType: 'application/json',
				dataType: 'text',
				data: JSON.stringify(todoItem),
				success: function(data){
					var todo = JSON.parse(data);
					todoItem['id'] = todo.id;
					that.collection.add(todoItem);
					var successAlertView = new SuccessAlertView({alertMessage:"TODO Added Successfully!"});
					successAlertView.render();
				},
				error: function(data){
					var failureAlertView = new FailureAlertView({alertMessage:"Failure in Saving Todo."})
					failureAlertView.render();
					that.model.set({
						assignedBy: '',
						taskDescription: '',
						dateCreated: '',
						dateModified: '',
						status:''
					});
				},
				complete: function(jqXHR,textStatus){
					child.ui.assignedBy.val('');
					child.ui.taskDescription.val('');
				}
			});
		}
	 },
	 
	 _getDate: function(){
		 var d = new Date();
		 return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
	 },
	 
	itemAdded: function() {
		console.log("itemAdded");
		this.showChildView('stats',new StatisticsView({collection: this.collection}));
		this.model.set({
			assignedBy: '',
			taskDescription: '',
			dateCreated: '',
			dateModified: '',
			status:''
		});
		
	 },
	 
	  invalidItem: function(errors){
		if(errors.validationError.hasOwnProperty('assignee')){
			var failureAlertView = new FailureAlertView({alertMessage:errors.validationError.assignee});
			failureAlertView.render();
			console.log(errors.validationError.assignee);
		}
		if(errors.validationError.hasOwnProperty('text')) {
			var failureAlertView = new FailureAlertView({alertMessage:errors.validationError.text})
			failureAlertView.render();
			console.log(errors.validationError.text);
		}
	 }
	
});

module.exports = Layout;