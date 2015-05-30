import React from 'react';
import Tag from './tag.jsx';

class TagSingle extends React.Component {

  static title = (props, request) => {
    const tag = props.tags.find(tag => tag.get("id") === request.params.id);
    return `Links for ${tag.get("id")}`;
  }

  static stores = (request) => {
    return {
      "tags": {}
    };
  }

  static preprocess = (props, request) => {
    if (request.params.id) {
      props.selected = request.params.id;
      props.tags = props.tags.filter(tag => tag.get("id") === request.params.id);
    }
    return props;
  }

  render() {
    const title = `Links for ${this.props.selected}`;
    const tags = this.props.tags.toArray().map(tag => <Tag tag={tag} />);
    return (
      <div className="Tag-single">
        <h3>{title}</h3>
        {tags}
      </div>
    );
  }

}

export default TagSingle;
