var React = require('react/addons');
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
    this.props.store.trigger("delete", "link", {id: this.props.link._id});
  },

  render: function() {
    var link = this.props.link;
    if (link.tags && link.tags instanceof Array) {
      var tags = link.tags.map(function(tag, i) {
        var key = tag +"_"+ i;
        var url = "/tags/"+ tag;
        return <a key={key} href={url}><Label>{tag}</Label></a>;
      });
    }
    return (
      <Col className="link" xs={12} sm={6} md={4}>
        <div className="thumbnail">
          <div className="caption">
            <h3><a href={link.url}>{link.title}</a></h3>
            <p>{link.url}</p>
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