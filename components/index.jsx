/** @jsx React.DOM */
var React = require('react/addons');
var Navigation = require('./navigation.jsx');
var Links = require('./links.jsx');

var reactBootstrap = require('react-bootstrap');
var Jumbotron = reactBootstrap.Jumbotron;

var Index = React.createClass({
  render: function() {
    var jumbotron = (
      <Jumbotron>
        <h1>urls</h1>
        <p>save and tag urls</p>
      </Jumbotron>
    );
    var introduction = !this.props.user ? jumbotron : "";
    var links = this.props.user ? this.transferPropsTo(<Links />) : "";

    return (
      <div>
        <Navigation user={this.props.user} />
        {introduction}
        {links}
      </div>
    );
  }
});

module.exports = Index;
