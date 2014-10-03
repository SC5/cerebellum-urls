/** @jsx React.DOM */
var React = require('react/addons');

var reactBootstrap = require('react-bootstrap');
var Panel = reactBootstrap.Panel;
var ListGroup = reactBootstrap.ListGroup;
var ListGroupItem = reactBootstrap.ListGroupItem;
var Label = reactBootstrap.Label;
var Button = reactBootstrap.Button;
var Input = reactBootstrap.Input;
var Glyphicon = reactBootstrap.Glyphicon;
var Row = reactBootstrap.Row;
var Col = reactBootstrap.Col;

var Links = React.createClass({
  getInitialState: function() {
    return {
      title: "",
      url: "",
      tags: ""
    };
  },
  add: function(event) {
    this.props.store.trigger("create", "links", {
      title: this.state.title.trim(),
      url: this.state.url.trim(),
      tags: this.state.tags.trim()
    });
    this.setState({title: "", url: "", tags: ""});
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

    var links = this.props.links.map(function(link) {
      if (link.tags && link.tags instanceof Array) {
        var tags = link.tags.map(function(tag) {
          var url = "/tags/"+ tag;
          return <a href={url}><Label>{tag}</Label></a>;
        });
      }
      return (
        <Col xs={12} sm={6} md={4} key={link.id}>
          <div className="thumbnail">
            <div className="caption">
              <h3><a href={link.url}>{link.title}</a></h3>
              <p>{link.url}</p>
              <p className="tags">{tags}</p>
            </div>
          </div>
        </Col>
      );
    });

    var linksGrid = (
      <Row>
        {links}
      </Row>
    );

    return (
      <div>
        <Panel>
          <Input type="text" ref="title" addonBefore="Title" onChange={this.changeTitle} value={this.state.title} />
          <Input type="text" ref="url" addonBefore={<span><Glyphicon glyph="link" />URL</span>} onChange={this.changeUrl} value={this.state.url} />
          <Input type="text" ref="tags" addonBefore={<span><Glyphicon glyph="tags" />Tags</span>} placeholder="Separate tags with commas" onChange={this.changeTags} value={this.state.tags} />
          <Button className="add" bsStyle="primary" onClick={this.add}>Add</Button>
        </Panel>

        <Panel>
          {linksGrid}
        </Panel>
      </div>
    );
  }
});

module.exports = Links;
