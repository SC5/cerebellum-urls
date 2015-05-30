import React from 'react';
import Tag from './tag.jsx';

class TagsList extends React.Component {

  static title = "your tags"

  static stores = (request) => {
    return {
      "tags": {}
    };
  }

  render() {
    const tags = this.props.tags.toArray().map(tag => <Tag tag={tag} />);
    return (
      <div className="Tags-list">
        <h3>All tags</h3>
        {tags}
      </div>
    );
  }

}

export default TagsList;
