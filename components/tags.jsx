import React from 'react';
import Navigation from './navigation.jsx';
import TagsList from './tags-list.jsx';
import TagSingle from './tag-single.jsx';

class Tags extends React.Component {

  static routes = {
    "": TagsList,
    "/:id": TagSingle
  }

  static stores = (request) => {
    return {
      "users": {}
    };
  }

  render() {
    const user = this.props.users[0];
    return (
      <div className="Tags">
        <Navigation user={user} />
        {this.props.children}
      </div>
    );
  }

}

export default Tags;
