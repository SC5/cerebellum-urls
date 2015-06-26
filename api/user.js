var user = require('express').Router();

module.exports = function(ensureAuthenticated) {
  user.use( ensureAuthenticated );

  user.get("/", function(req, res) {
    res.json([req.user]);
  });

  return user;
};
