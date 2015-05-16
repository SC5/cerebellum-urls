import React from 'react';
import {Panel, Button, Input, Glyphicon} from 'react-bootstrap';
import Crouton from 'react-crouton';
import Link from './link.jsx';

class LinkForm extends React.Component {

  constructor(props, context) {
    super(props);

    this.context = context;

    // this is fugly, I know
    // with autobind this monstrosity would go away
    this.buttons = this.buttons.bind(this);
    this.errors = this.errors.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.add = this.add.bind(this);
    this.linkState = this.linkState.bind(this);
    this.clear = this.clear.bind(this);
    this.update = this.update.bind(this);
    this.clearErrors = this.clearErrors.bind(this);

    this.state = {
      title: "",
      url: "",
      tags: "",
      id: null,
      errors: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const link = nextProps.link;

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
  }

  setErrors(error) {
    const messages = Object.keys(error.result.errors).map(key => {
      return error.result.errors[key].message;
    });
    this.setState({errors: [messages]});
  }

  add(event) {
    this.context.store.dispatch("create", "links", this.linkState()).catch(this.setErrors);
    this.clear();
  }

  linkState() {
    return {
      title: this.state.title.trim(),
      url: this.state.url.trim(),
      tags: this.state.tags.trim().split(",").map(tag => tag.trim())
    };
  }

  clear() {
    this.setState({title: "", url: "", tags: "", id: null});
  }

  update(event) {
    this.context.store.dispatch(
      "update",
      "link",
      {id: this.state.id},
      this.linkState()
    )
    .then(() => {
      this.props.selectLink(null);
    })
    .catch(this.setErrors);
  }

  cancel(event) {
    this.props.selectLink(null);
  }

  change(field, event) {
    this.setState({[field]: event.target.value, errors: []});
  }

  clearErrors() {
    this.setState({errors: []});
  }

  buttons() {
    if (this.state.id) {
      return (
        <div>
          <Button className="add" bsStyle="primary" onClick={this.update}>Update</Button>
          <Button bsStyle="link" onClick={this.cancel}>Cancel</Button>
        </div>
      );
    } else {
      return (
        <Button className="add" bsStyle="primary" onClick={this.add}>Add</Button>
      );
    }
  }

  errors() {
    if (this.state.errors.length) {
      return (
        <div className="alert alert-danger">
          <Crouton id={Date.now()} type="error" message={this.state.errors} buttons="close" autoMiss={false} onDismiss={this.clearErrors} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="link-form">
        {this.errors()}
        <Panel>
          <Input type="text" ref="title" addonBefore="Title" onChange={this.change.bind(this, "title")} value={this.state.title} />
          <Input type="text" ref="url" addonBefore={<span><Glyphicon glyph="link" />URL</span>} onChange={this.change.bind(this, "url")} value={this.state.url} />
          <Input type="text" ref="tags" addonBefore={<span><Glyphicon glyph="tags" />Tags</span>} placeholder="Separate tags with commas" onChange={this.change.bind(this, "tags")} value={this.state.tags} />
          {this.buttons()}
        </Panel>
      </div>
    );
  }

}

LinkForm.contextTypes = {
  store: React.PropTypes.object
};

export default LinkForm;
