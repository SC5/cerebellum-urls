import React from 'react';
import PureComponent from 'react-pure-render/component';
import {Panel, Row} from 'react-bootstrap';
import Link from './link.jsx';

class Links extends PureComponent {

  render() {
    const {store, selectLink} = this.props;
    const links = this.props.links.sortBy(link => link.get("modified")).reverse().map((link, i) => {
      return <Link key={link.get("_id")} link={link} selectLink={selectLink} />
    });

    return (
      <div className="Links">
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
