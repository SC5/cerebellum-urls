var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var Jumbotron = ReactBootstrap.Jumbotron;

var Navigation = require('./navigation.jsx');
var Links = require('./links.jsx');
var LinkForm = require('./link-form.jsx');

var Index = React.createClass({
  getInitialState: function() {
    return {
      selectedLink: null
    }
  },
  selectLink: function(link) {
    this.setState({selectedLink: link});
  },
  render: function() {
    var introduction, links, linkForm;

    if (this.props.user) {
      introduction = "";
      linkForm = <LinkForm store={this.props.store} link={this.state.selectedLink} selectLink={this.selectLink} />;
      links = <Links {...this.props} selectLink={this.selectLink} />;
    } else {
      introduction = (
        <Jumbotron>
          <h1>urls</h1>
          <p>save and tag urls</p>
        </Jumbotron>
      );
      linkForm = "";
      links = "";
    }

    return (
      <div>
        <Navigation user={this.props.user} />
        {introduction}
        {linkForm}
        {links}
      </div>
    );
  }
});

module.exports = Index;
