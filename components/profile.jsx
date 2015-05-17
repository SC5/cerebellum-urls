import React from 'react';
import {Jumbotron, Panel} from 'react-bootstrap';
import Navigation from './navigation.jsx';
import '../assets/styles/profile.css';

class Profile extends React.Component {

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

Profile.title = "urls - your profile";

Profile.stores = (request) => {
  return {
    "user": {}
  };
};

export default Profile;
