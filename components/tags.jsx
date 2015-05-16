import React from 'react';
import Navigation from './navigation.jsx';
import Tag from './tag.jsx';

class Tags extends React.Component {

  render() {
    const {user, selected} = this.props;
    const title = selected ? `Links for ${selected}` : "All tags";
    const tags = this.props.tags.toArray().map(tag => <Tag tag={tag} />);
    return (
      <div>
        <Navigation user={user} />
        <h3>{title}</h3>
        {tags}
      </div>
    );
  }

}

Tags.title = "urls - your tags";

Tags.stores = (request) => {
  return {
    "tags": {},
    "user": {}
  };

};

Tags.preprocess = (props, request) => {
  if (request.params.id) {
    props.selected = request.params.id;
    props.tags = props.tags.filter(tag => tag.get("id") === request.params.id);
  }
  return props;
};

export default Tags;
