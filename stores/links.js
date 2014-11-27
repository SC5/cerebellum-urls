var cerebellum = require('cerebellum');
var Collection = cerebellum.Collection;
var Model = cerebellum.Model;
var apiConfig = require("../config/api");

var Links = Collection.extend({
  cacheKey: "links",
  model: Model.extend({idAttribute: "_id"}),
  url: apiConfig.url +"/api/links"
});

module.exports = Links;