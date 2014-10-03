var exoskeleton = require('cerebellum').exoskeleton;
var Collection = exoskeleton.Collection;
var apiConfig = require("../config/api");

var Tags = Collection.extend({
  url: apiConfig.url +"/api/tags"
});

module.exports = Tags;