/** @jsx React.DOM */
var React = require('react/addons');
var reactBootstrap = require('react-bootstrap');

var Navbar = reactBootstrap.Navbar;
var NavItem = reactBootstrap.NavItem;
var Nav = reactBootstrap.Nav;

var Navigation = React.createClass({
  render: function() {
    var brand = <a href="/" className="navbar-brand">urls</a>;

    var navigation;
    if (this.props.user) {
      navigation = (
        <Nav className="bs-navbar-collapse" key={0} role="navigation">
          <NavItem href="/tags">Tags</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem href="/logout" className="logout">Logout {this.props.user.email}</NavItem>
        </Nav>
      );
    } else {
      navigation = (
        <Nav className="bs-navbar-collapse" key={0} role="navigation">
          <NavItem href="/auth/google" className="login">Login with Google</NavItem>
        </Nav>
      );
    }

    return (
      <Navbar brand={brand} fixedTop toggleNavKey={0}>
        {navigation}
      </Navbar>
    );
  }
});

module.exports = Navigation;
