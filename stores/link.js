var cerebellum = require('cerebellum');
var Model = cerebellum.Model;
var apiConfig = require("../config/api");

var Link = Model.extend({
  relatedCaches: function() {
    return {"links": "/"};
  },
  cacheKey: function() {
    return "link/"+ this.storeOptions.id
  },
  url: function() {
    return apiConfig.url +"/api/links/"+ this.storeOptions.id;
  }
});

module.exports = Link;