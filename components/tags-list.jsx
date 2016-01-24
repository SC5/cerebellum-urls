import React from 'react';
import PureComponent from 'react-pure-render/component';
import Tag from './tag.jsx';

class TagsList extends PureComponent {

  static title = "your tags"

  static stores = (request) => {
    return {
      "tags": {}
    };
  }

  render() {
    const tags = this.props.tags.map(tag => <Tag key={tag} tag={tag} />);
    return (
      <div className="Tags-list">
        <h3>All tags</h3>
        {tags}
      </div>
    );
  }

}

export default TagsList;
