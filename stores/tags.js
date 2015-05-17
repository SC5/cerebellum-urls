var Collection = require('cerebellum/collection');
var apiConfig = require("../config/api");

var Tags = Collection.extend({
  cacheKey: "tags",
  url: apiConfig.url +"/api/tags"
});

module.exports = Tags;