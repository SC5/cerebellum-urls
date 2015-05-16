import React from 'react';
import {Panel, Row} from 'react-bootstrap';
import Link from './link.jsx';

class Links extends React.Component {

  render() {
    const {store, selectLink} = this.props;
    const links = this.props.links.toArray().map((link, i) => {
      return <Link key={i} store={store} link={link} selectLink={selectLink} />
    });

    return (
      <div>
        <Panel>
          <Row>
            {links}
          </Row>
        </Panel>
      </div>
    );
  }

}

export default Links;
