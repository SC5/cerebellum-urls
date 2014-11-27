var Model = require('cerebellum').Model;
var apiConfig = require("../config/api");

var User = Model.extend({
  cacheKey: "user",
  idAttribute: "_id",
  url: function() {
    return apiConfig.url +"/api/user";
  },
  isValid: function() {
    return !this.isNew();
  }
});

module.exports = User;