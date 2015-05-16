import React from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class Tag extends React.Component {

  render() {
    const {tag} = this.props;

    return (
      <Panel key={tag.get("id")} header={tag.get("id")}>
        <ListGroup>
          {tag.get("links").toArray().map((link, i) => {
            return (
              <ListGroupItem key={`link_${i}`} href={link.get("url")}>
                {link.get("title")}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }

}

export default Tag;
