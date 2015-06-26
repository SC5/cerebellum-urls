import React from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import '../assets/styles/navigation.css';

class Navigation extends React.Component {

  render() {
    const brand = <a href="/" className="navbar-brand">urls</a>;
    let navigation = null;

    if (this.props.user._id) {
      navigation = (
        <Nav className="Navigation-nav bs-navbar-collapse" eventKey={0} role="navigation">
          <NavItem href="/tags">Tags</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/logout" className="logout">Logout {this.props.user.email}</NavItem>
        </Nav>
      );
    } else {
      navigation = (
        <Nav className="Navigation-nav bs-navbar-collapse" eventKey={0} role="navigation">
          <NavItem href="/auth/google" className="login">Login with Google</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar className="Navigation" brand={brand} fixedTop toggleNavKey={0}>
        {navigation}
      </Navbar>
    );
  }

}

export default Navigation;
