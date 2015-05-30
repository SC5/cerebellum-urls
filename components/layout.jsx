import React from 'react';
import '../assets/styles/global.css';
import '../assets/styles/layout.css';

class Layout extends React.Component {

  static childContextTypes = {
    store: React.PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    // https://github.com/facebook/react/issues/3392
    return (
      <div className="Layout">
        {this.props.createComponent()}
      </div>
    );
  }

}

export default Layout;
