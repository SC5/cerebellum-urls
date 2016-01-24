import React from 'react';
import PureComponent from 'react-pure-render/component';
import {Jumbotron} from 'react-bootstrap';

import Navigation from './navigation.jsx';
import Links from './links.jsx';
import LinkForm from './link-form.jsx';

class Index extends PureComponent {

  static title = "save and tag your urls"

  static stores = (request) => {
    return {
      "user": {},
      "links": {}
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedLink: null
    };

    this.selectLink = this.selectLink.bind(this);
  }

  selectLink(link) {
    this.setState({selectedLink: link});
  }

  loggedIn(user, links) {
    return (
      <div className="Index">
        <Navigation user={user} />
        <LinkForm link={this.state.selectedLink} selectLink={this.selectLink} />
        <Links user={user} links={links} selectLink={this.selectLink} />
      </div>
    );
  }

  notLoggedIn(user, links) {
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
    let {user, links} = this.props;

    if (user.get("_id")) {
      return this.loggedIn(user, links);
    } else {
      return this.notLoggedIn(user, links);
    }
  }

}

export default Index;
