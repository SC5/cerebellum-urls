var router = require('express').Router();
var user = require('./user');
var links = require('./links');
var tags = require('./tags');

function ensureAuthenticated(req, res, next) {
  if ( req.isAuthenticated() ) {
    return next();
  }
  return res.status(401).json({error: "Unauthorized"});
}

router.use("/user", user(ensureAuthenticated));
router.use("/links", links(ensureAuthenticated));
router.use("/tags", tags(ensureAuthenticated));

module.exports = router;
