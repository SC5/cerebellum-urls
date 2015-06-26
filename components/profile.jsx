import React from 'react';
import {Jumbotron, Panel} from 'react-bootstrap';
import Navigation from './navigation.jsx';
import '../assets/styles/profile.css';

class Profile extends React.Component {

  static title = "your profile"

  static stores = (request) => {
    return {
      "users": {}
    };
  }

  render() {
    const user = this.props.users[0];

    return (
      <div className="Profile">
        <Navigation user={user} />

        <Jumbotron>
          <h1>{user.name}</h1>
        </Jumbotron>

        <Panel>
          There's not much going on around here.
        </Panel>
      </div>
    );
  }

}

export default Profile;
