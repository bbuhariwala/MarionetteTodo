window._ = require('underscore'); // Backbone can't see it otherwise

var Backbone = require('backbone');
Backbone.$ = window.$; // Use the jQuery from the script tag
Backbone.Marionette = require('backbone.marionette');