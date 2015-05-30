import React from 'react';
import {Jumbotron, Panel} from 'react-bootstrap';
import Navigation from './navigation.jsx';
import '../assets/styles/profile.css';

class Profile extends React.Component {

  static title = "your profile"

  static stores = (request) => {
    return {
      "user": {}
    };
  }

  render() {
    const user = this.props.user;

    return (
      <div className="Profile">
        <Navigation user={user} />

        <Jumbotron>
          <h1>{user.get("name")}</h1>
        </Jumbotron>

        <Panel>
          There's not much going on around here.
        </Panel>
      </div>
    );
  }

}

export default Profile;
