var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Jumbotron = ReactBootstrap.Jumbotron;
var Panel = ReactBootstrap.Panel;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Navigation = require('./navigation.jsx');

var Tags = React.createClass({
  render: function() {
    var title = this.props.selected ? "Links for "+this.props.selected : "All tags";
    var tags = this.props.tags.toArray().map(function(tag) {
      return (
        <Panel key={tag.get("id")} header={tag.get("id")}>
          <ListGroup>
            {tag.get("links").toArray().map(function(link, i) {
              var key = "link_" + i;
              return <ListGroupItem key={key} href={link.get("url")}>{link.get("title")}</ListGroupItem>
            })}
          </ListGroup>
        </Panel>
      );
    });
    return (
      <div>
        <Navigation user={this.props.user} />
        <h3>{title}</h3>
        {tags}
      </div>
    );
  }
});

module.exports = Tags;
