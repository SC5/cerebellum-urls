import React from 'react';
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';

class Tag extends React.Component {

  render() {
    const {tag} = this.props;

    return (
      <Panel key={tag.id} header={tag.id}>
        <ListGroup>
          {tag.links.map((link, i) => {
            return (
              <ListGroupItem key={`link_${i}`} href={link.url}>
                {link.title}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Panel>
    );
  }

}

export default Tag;
