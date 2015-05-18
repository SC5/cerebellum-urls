import React from 'react';
import '../assets/styles/global.css';
import '../assets/styles/layout.css';

class Layout extends React.Component {

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    // https://github.com/facebook/react/issues/3392
    let component = this.props.createComponent();
    return (
      <div className="Layout">
        {component}
      </div>
    );
  }

}

Layout.childContextTypes = {
  store: React.PropTypes.object
};

export default Layout;
