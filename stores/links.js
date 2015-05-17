var Collection = require('cerebellum/collection');
var Model = require('cerebellum/model');
var apiConfig = require("../config/api");

var Links = Collection.extend({
  model: Model.extend({idAttribute: "_id"}),
  url: apiConfig.url +"/api/links"
});

module.exports = Links;