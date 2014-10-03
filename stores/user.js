var Model = require('cerebellum').exoskeleton.Model;
var apiConfig = require("../config/api");

var User = Model.extend({
  idAttribute: "_id",
  url: function() {
    return apiConfig.url +"/api/user";
  },
  isValid: function() {
    return !this.isNew();
  }
});

module.exports = User;