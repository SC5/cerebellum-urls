var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Col = ReactBootstrap.Col;
var Label = ReactBootstrap.Label;
var ButtonGroup = ReactBootstrap.ButtonGroup;
var Button = ReactBootstrap.Button;

var Link = React.createClass({

  edit: function() {
    this.props.selectLink(this.props.link);
  },

  delete: function() {
    this.props.store.dispatch("delete", "link", {id: this.props.link.get("_id")});
  },

  render: function() {
    var link = this.props.link;
    if (link.get("tags")) {
      var tags = link.get("tags").toArray().map(function(tag, i) {
        var key = tag +"_"+ i;
        var url = "/tags/"+ tag;
        return <a key={key} href={url}><Label>{tag}</Label></a>;
      });
    }
    return (
      <Col className="link" xs={12} sm={6} md={4}>
        <div className="thumbnail">
          <div className="caption">
            <h3><a href={link.get("url")}>{link.get("title")}</a></h3>
            <p>{link.get("url")}</p>
            <p className="tags">{tags}</p>
            <p className="modify">
              <Button bsStyle="link" bsSize="small" onClick={this.edit}>Edit</Button>
              <Button bsStyle="link" bsSize="small" onClick={this.delete}>Delete</Button>
            </p>
          </div>
        </div>
      </Col>
    );
  }

});

module.exports = Link;