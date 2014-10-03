var tags = require('express').Router();
var Link = require('./models/link');
var _ = require('lodash');

module.exports = function(ensureAuthenticated) {
  tags.use( ensureAuthenticated );

  tags.get("/", function(req, res) {

    return Link.find({'user': req.user._id}).select("tags url title").sort("-modified").exec(function (err, links) {
      var tagsCollection = links.reduce(function(tags, link) {
        link.tags.forEach(function(tag) {
          tags[tag] = tags[tag] || [];
          tags[tag].push(_.pick(link, "url", "title"));
        });
        return tags;
      }, {});

      var tags = Object.keys(tagsCollection).map(function(tag) {
        return {
          id: tag,
          links: tagsCollection[tag]
        };
      });

      if (err) {
        return res.send(err);
      }
      return res.json(tags);
    });
  });

  tags.get("/:id", function(req, res) {

    return Link.find({ 'user': req.user._id}).where('tags').in([req.params.id]).select("url title").exec(function(err, links) {
      if (err) {
        return res.send(err);
      }
      return res.json({
        id: req.params.id,
        links: links
      });
    });
  });

  return tags;
};
