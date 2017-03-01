var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var StatisticsView = Marionette.LayoutView.extend({
	initialize: function(options){
		console.log("Statistics View has been initialized");
		var that = this;
	},
	template: require("../templates/stats.html"),
	
	templateHelpers: function(){
		return {
			totalCountChecker: function(){
				return this.items.length;
			},
			notStartedChecker: function() {
				var count=0;
				for(var i=0;i < this.items.length;i++ ){
					if(this.items[i].status === "Not Started"){
						count++;
					}
				}
				return count;
			},
			inProgressChecker: function() {
				var count=0;
				for(var i=0;i < this.items.length;i++ ){
					if(this.items[i].status === "In Progress"){
						count++;
					}
				}
				return count;
			},
			completeChecker: function(){
				var count=0;
				for(var i=0;i < this.items.length;i++ ){
					if(this.items[i].status === "Complete"){
						count++;
					}
				}
				return count;
			}
		}
	},
	onRender: function(){
		console.log("Let see how many times rendered");
	}
});

module.exports = StatisticsView;