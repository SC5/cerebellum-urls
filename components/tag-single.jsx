import React from 'react';
import Tag from './tag.jsx';
import find from 'lodash/collection/find';

class TagSingle extends React.Component {

  static title = (props, request) => {
    const tag = find(props.tags, tag => tag.id === request.params.id);
    return `Links for ${tag.id}`;
  }

  static stores = (request) => {
    return {
      "tags": {}
    };
  }

  static preprocess = (props, request) => {
    if (request.params.id) {
      props.selected = request.params.id;
      props.tags = props.tags.filter(tag => tag.id === request.params.id);
    }
    return props;
  }

  render() {
    const title = `Links for ${this.props.selected}`;
    const tags = this.props.tags.map(tag => <Tag tag={tag} />);
    return (
      <div className="Tag-single">
        <h3>{title}</h3>
        {tags}
      </div>
    );
  }

}

export default TagSingle;
