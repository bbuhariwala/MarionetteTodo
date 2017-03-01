require('./setup.js');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TodoView = require('./assets/views/layout');
var ToDoModel = require('./assets/models/todo');
var TodoList = require('./assets/collections/initialData');

var todoList = new TodoList();
todoList.fetch({
	success: function(todos){
		console.log("Successfully fetched-"+todos.length+" records")
	},
	error: function(){
		console.log("Failure in fetching records")
	}
})

//new Backbone.Collection(options.initialData),
var app = new Marionette.Application({
	onStart: function(options){
		var todo = new TodoView({
			collection: todoList,
			model: new ToDoModel
		});
		todo.render();
		todo.triggerMethod('show');
	}
});

app.start({});
