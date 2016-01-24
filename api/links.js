var links = require('express').Router();
var Link = require('./models/link');

module.exports = function(ensureAuthenticated) {
  links.use( ensureAuthenticated );

  links.get("/", function(req, res) {
    return Link.find({'user': req.user._id}).select("-__v -user").sort("-modified").exec(function(err, links) {
      if (err) {
        return res.send(err);
      }
      return res.json(
        links.map(link => {
          return {...link.toJSON(), tags: link.tags.join(",")};
        })
      );
    });
  });

  links.post("/", function(req, res) {
    var link = new Link();
    link.title = req.body.title;
    link.url = req.body.url;
    link.modified = Date.now();
    link.tags = req.body.tags ? req.body.tags : [];
    link.user = req.user._id;

    link.save(function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json({});
    });
  });

  links.get("/:id", function(req, res) {
    return Link.findOne({_id: req.params.id, user: req.user._id}).exec(function(err, link) {
      if (err) {
        return res.send(err);
      }
      return res.json(link);
    });
  });

  links.post("/:id", function(req, res) {
    return Link.findOne({_id: req.params.id, user: req.user._id}).exec(function(err, link) {
      if (err) {
        return res.status(500).send(err);
      }

      link.title = req.body.title;
      link.url = req.body.url;
      link.modified = Date.now();
      link.tags = req.body.tags ? req.body.tags : [];

      link.save(function(err) {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).json({});
      });
    });
  });

  links.delete("/:id", function(req, res) {
    return Link.remove({_id: req.params.id, user: req.user._id}, function(err, link) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).json({});
    });
  });

  return links;
};
