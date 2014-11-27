var React = require('react/addons');
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
    var tags = this.props.tags.map(function(tag) {
      return (
        <Panel key={tag.id} header={tag.id}>
          <ListGroup>
            {tag.links.map(function(link, i) {
              var key = link + "_" + i;
              return <ListGroupItem key={key} href={link.url}>{link.title}</ListGroupItem>
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
