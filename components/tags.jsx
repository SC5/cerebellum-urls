/** @jsx React.DOM */
var React = require('react/addons');
var Navigation = require('./navigation.jsx');

var reactBootstrap = require('react-bootstrap');

var Jumbotron = reactBootstrap.Jumbotron;
var Panel = reactBootstrap.Panel;
var ListGroup = reactBootstrap.ListGroup;
var ListGroupItem = reactBootstrap.ListGroupItem;
var Row = reactBootstrap.Row;
var Col = reactBootstrap.Col;

var Tags = React.createClass({
  render: function() {
    var title = this.props.selected ? "Links for "+this.props.selected : "All tags";
    var tags = this.props.tags.map(function(tag) {
      return (
        <Panel key={tag.id} header={tag.id}>
          <ListGroup>
            {tag.links.map(function(link) {
              return <ListGroupItem href={link.url}>{link.title}</ListGroupItem>
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
