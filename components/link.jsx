import React from 'react';
import {Col, Label, ButtonGroup, Button} from 'react-bootstrap';
import '../assets/styles/link.css';

import PureComponent from './pure.jsx';

class Link extends PureComponent {

  static contextTypes = {
    store: React.PropTypes.object
  }

  render() {
    const {clear, link, remove, selectLink} = this.props;
    let tags = null;

    if (link.tags) {
      tags = link.tags.map((tag, i) => {
        return (
          <a key={`${tag}_${i}`} href={`/tags/${tag}`}>
            <Label>{tag}</Label>
          </a>
        );
      });
    }

    return (
      <Col className="Link" xs={12} sm={6} md={4}>
        <div className="thumbnail">
          <div className="caption">
            <h3><a href={link.url}>{link.title}</a></h3>
            <p>{link.url}</p>
            <p className="Link-tags">{tags}</p>
            <p className="Link-modify">
              <Button bsStyle="link" bsSize="small" onClick={() => { clear(); selectLink(link)}}>Edit</Button>
              <Button bsStyle="link" bsSize="small" onClick={() => remove({id: link._id})}>Delete</Button>
            </p>
          </div>
        </div>
      </Col>
    );
  }

}

export default Link;
