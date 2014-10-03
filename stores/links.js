var exoskeleton = require('cerebellum').exoskeleton;
var Collection = exoskeleton.Collection;
var Model = exoskeleton.Model;
var apiConfig = require("../config/api");

var Links = Collection.extend({
  model: Model.extend({idAttribute: "_id"}),
  url: apiConfig.url +"/api/links"
});

module.exports = Links;