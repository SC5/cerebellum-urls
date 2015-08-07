import React from 'react';
import {Jumbotron} from 'react-bootstrap';

import Navigation from './navigation.jsx';
import Links from './links.jsx';
import LinkForm from './link-form.jsx';

import PureComponent from './pure.jsx';

class Index extends PureComponent {

  static title = "save and tag your urls"

  static actions = {
    linkForm: ["selectLink", "clear", "clearErrors", "update"],
    links: ["create", "update", "remove"]
  }

  static stores = () => {
    return {
      users: {},
      links: {},
      linkForm: {}
    };
  }

  static preprocess = (props) => {
    props.linkForm.selectedLink.tags = Array.isArray(props.linkForm.selectedLink.tags)
      ? props.linkForm.selectedLink.tags.join(",")
      : props.linkForm.selectedLink.tags;

    return props;
  }

  loggedIn(props) {
    const {users, links, linkForm, actions} = props;
    const user = users[0] || {};
    return (
      <div className="Index">
        <Navigation user={user} />
        <LinkForm
          state={linkForm}
          formActions={actions.linkForm}
          linkActions={actions.links} />
        <Links
          user={user}
          links={links}
          selectLink={actions.linkForm.selectLink}
          remove={actions.links.remove}
          clear={actions.linkForm.clear} />
      </div>
    );
  }

  notLoggedIn(user) {
    return (
      <div className="Index">
        <Navigation user={user} />
        <Jumbotron>
          <h1>urls</h1>
          <p>save and tag urls</p>
        </Jumbotron>
      </div>
    );
  }

  render() {
    const user = this.props.users[0] || {};
    if (user._id) {
      return this.loggedIn(this.props);
    } else {
      return this.notLoggedIn(user);
    }
  }

}

export default Index;
