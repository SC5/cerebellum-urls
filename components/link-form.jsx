import React from 'react';
import {Panel, Button, Input, Glyphicon} from 'react-bootstrap';
import Crouton from 'react-crouton';
import Link from './link.jsx';
import PureComponent from './pure.jsx';

import '../assets/styles/link-form.css';

function formatState(state) {
  return {
    title: state.selectedLink.title.trim(),
    url: state.selectedLink.url.trim(),
    tags: state.selectedLink.tags.trim().split(",").map(tag => tag.trim())
  };
}

class LinkForm extends PureComponent {

  static contextTypes = {
    store: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.buttons = this.buttons.bind(this);
    this.errors = this.errors.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
  }

  add(state, linkActions, formActions) {
    linkActions.create({}, formatState(state));
  }

  update(state, linkActions, formActions) {
    linkActions.update({id: state.selectedLink._id}, formatState(state));
  }

  buttons(state, linkActions, formActions) {
    if (state.selectedLink._id) {
      return (
        <div>
          <Button
            className="LinkForm-add"
            bsStyle="primary"
            onClick={() => this.update(state, linkActions, formActions)}>Update</Button>
          <Button
            bsStyle="link"
            onClick={() => formActions.clear()}>Cancel</Button>
        </div>
      );
    } else {
      return (
        <Button
          className="LinkForm-add"
          bsStyle="primary"
          onClick={() => this.add(state, linkActions, formActions)}>Add</Button>
      );
    }
  }

  errors(state, formActions) {
    if (state.errors.length) {
      return (
        <div className="LinkForm-alert alert alert-danger">
          <Crouton
            id={Date.now()}
            type="error"
            message={state.errors}
            buttons="close"
            autoMiss={false}
            onDismiss={formActions.clearErrors} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      state,
      formActions,
      linkActions
    } = this.props;

    return (
      <div className="LinkForm">
        {this.errors(state, formActions)}
        <Panel>
          <Input
            type="text"
            ref="title"
            addonBefore="Title"
            onChange={(e) => formActions.update("title", e.target.value)}
            value={state.selectedLink.title} />
          <Input
            type="text"
            ref="url"
            addonBefore={<span><Glyphicon glyph="link" />URL</span>}
            onChange={(e) => formActions.update("url", e.target.value)}
            value={state.selectedLink.url} />
          <Input
            type="text"
            ref="tags"
            addonBefore={<span><Glyphicon glyph="tags" />Tags</span>}
            placeholder="Separate tags with commas"
            onChange={(e) => formActions.update("tags", e.target.value)}
            value={state.selectedLink.tags} />

          {this.buttons(state, linkActions, formActions)}
        </Panel>
      </div>
    );
  }

}

export default LinkForm;
