import React from 'react';
import {Panel, Row} from 'react-bootstrap';
import Link from './link.jsx';

class Links extends React.Component {

  render() {
    const {clear, links, store, selectLink, remove} = this.props;

    return (
      <div className="Links">
        <Panel>
          <Row>
            {
              links.map((link, i) => {
                return (
                  <Link
                    key={i}
                    store={store}
                    link={link}
                    selectLink={selectLink}
                    clear={clear}
                    remove={remove} />
                );
              })
            }
          </Row>
        </Panel>
      </div>
    );
  }

}

export default Links;
