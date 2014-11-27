var cerebellum = require('cerebellum');
var Collection = cerebellum.Collection;
var apiConfig = require("../config/api");

var Tags = Collection.extend({
  cacheKey: "tags",
  url: apiConfig.url +"/api/tags"
});

module.exports = Tags;