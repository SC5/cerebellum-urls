/** @jsx React.DOM */
var React = require('react/addons');
var Navigation = require('./navigation.jsx');

var reactBootstrap = require('react-bootstrap');
var Jumbotron = reactBootstrap.Jumbotron;
var Panel = reactBootstrap.Panel;

var Profile = React.createClass({
  render: function() {
    var user = this.props.user;

    return <div>
      <Navigation user={this.props.user} />

      <Jumbotron>
        <h1>{this.props.user.name}</h1>
      </Jumbotron>

      <Panel>
        There's not much going on around here.
      </Panel>
    </div>
  }
});

module.exports = Profile;