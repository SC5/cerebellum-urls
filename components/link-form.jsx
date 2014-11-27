var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
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
      id: null
    };
  },
  componentWillReceiveProps: function(nextProps) {
    var link = nextProps.link;

    if (link) {
      this.setState({
        id: link._id,
        title: link.title,
        url: link.url,
        tags: link.tags.join(",")
      });
    } else {
      this.clear();
    }
  },
  add: function(event) {
    this.props.store.trigger("create", "links", this.linkState());
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
    this.props.store.trigger("update", "link", {id: this.state.id}, this.linkState());
    this.props.selectLink(null);
  },
  cancel: function(event) {
    this.props.selectLink(null);
  },
  changeTitle: function(event) {
    this.setState({title: event.target.value});
  },
  changeUrl: function(event) {
    this.setState({url: event.target.value});
  },
  changeTags: function(event) {
    this.setState({tags: event.target.value});
  },
  render: function() {
    var controls;
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

    return (
      <div className="link-form">
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
