var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Crouton = require('react-crouton');
var Panel = ReactBootstrap.Panel;
var Button = ReactBootstrap.Button;
var Input = ReactBootstrap.Input;
var Glyphicon = ReactBootstrap.Glyphicon;

var Link = require('./link.jsx');

var LinkForm = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      url: "",
      tags: "",
      id: null,
      errors: []
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var link = nextProps.link;

    if (link) {
      this.setState({
        id: link.get("_id"),
        title: link.get("title"),
        url: link.get("url"),
        tags: link.get("tags").join(",")
      });
    } else {
      this.clear();
    }
  },
  setErrors: function(error) {
    var messages = Object.keys(error.result.errors).map(function(key) {
      return error.result.errors[key].message;
    });
    var errors = [messages];
    this.setState({errors: errors});
  },
  add: function(event) {
    this.props.store.dispatch("create", "links", this.linkState()).catch(this.setErrors);
    this.clear();
  },
  linkState: function() {
    return {
      title: this.state.title.trim(),
      url: this.state.url.trim(),
      tags: this.state.tags.trim().split(",").map(function(tag) { return tag.trim(); })
    };
  },
  clear: function() {
    this.setState({title: "", url: "", tags: "", id: null});
  },
  update: function(event) {
    var self = this;
    this.props.store.dispatch("update", "link", {id: this.state.id}, this.linkState()).then(function() {
      self.props.selectLink(null);
    }).catch(this.setErrors);
  },
  cancel: function(event) {
    this.props.selectLink(null);
  },
  changeTitle: function(event) {
    this.setState({title: event.target.value, errors: []});
  },
  changeUrl: function(event) {
    this.setState({url: event.target.value, errors: []});
  },
  changeTags: function(event) {
    this.setState({tags: event.target.value, errors: []});
  },
  clearErrors: function() {
    this.setState({errors: []});
  },
  render: function() {
    var controls, errors;
    if (this.state.id) {
      controls = (
        <div>
          <Button className="add" bsStyle="primary" onClick={this.update}>Update</Button>
          <Button bsStyle="link" onClick={this.cancel}>Cancel</Button>
        </div>
      );
    } else {
      controls = <Button className="add" bsStyle="primary" onClick={this.add}>Add</Button>;
    }

    if (this.state.errors.length) {
      errors = (
        <div className="alert alert-danger">
          <Crouton id={Date.now()} type="error" message={this.state.errors} buttons="close" autoMiss={false} onDismiss={this.clearErrors} />
        </div>
      );
    } else {
      errors = null;
    }

    return (
      <div className="link-form">
        {errors}
        <Panel>
          <Input type="text" ref="title" addonBefore="Title" onChange={this.changeTitle} value={this.state.title} />
          <Input type="text" ref="url" addonBefore={<span><Glyphicon glyph="link" />URL</span>} onChange={this.changeUrl} value={this.state.url} />
          <Input type="text" ref="tags" addonBefore={<span><Glyphicon glyph="tags" />Tags</span>} placeholder="Separate tags with commas" onChange={this.changeTags} value={this.state.tags} />
          {controls}
        </Panel>
      </div>
    );
  }
});

module.exports = LinkForm;
