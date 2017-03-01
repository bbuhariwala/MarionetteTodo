var Backbone = require('backbone')
var ToDo = require('../models/todo')

var TodoList = Backbone.Collection.extend({
	model: ToDo,
	url: './webapi/todo'
});


module.exports = TodoList;
