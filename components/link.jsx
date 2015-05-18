import React from 'react';
import {Col, Label, ButtonGroup, Button} from 'react-bootstrap';
import '../assets/styles/link.css';

class Link extends React.Component {

  constructor(props, context) {
    super(props);
    this.context = context;
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  edit() {
    this.props.selectLink(this.props.link);
  }

  delete() {
    this.context.store.dispatch("delete", "link", {id: this.props.link.get("_id")});
  }

  render() {
    const link = this.props.link;
    let tags = null;

    if (link.get("tags")) {
      tags = link.get("tags").toArray().map((tag, i) => {
        return <a key={`${tag}_${i}`} href={`/tags/${tag}`}><Label>{tag}</Label></a>;
      });
    }

    return (
      <Col className="Link" xs={12} sm={6} md={4}>
        <div className="thumbnail">
          <div className="caption">
            <h3><a href={link.get("url")}>{link.get("title")}</a></h3>
            <p>{link.get("url")}</p>
            <p className="Link-tags">{tags}</p>
            <p className="Link-modify">
              <Button bsStyle="link" bsSize="small" onClick={this.edit}>Edit</Button>
              <Button bsStyle="link" bsSize="small" onClick={this.delete}>Delete</Button>
            </p>
          </div>
        </div>
      </Col>
    );
  }

}

Link.contextTypes = {
  store: React.PropTypes.object
};

export default Link;
