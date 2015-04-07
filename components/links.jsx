var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Panel = ReactBootstrap.Panel;
var Row = ReactBootstrap.Row;

var Link = require('./link.jsx');

var Links = React.createClass({
  render: function() {
    var store = this.props.store;
    var selectLink = this.props.selectLink;
    var links = this.props.links.toArray().map(function(link) {
      return <Link key={link.get("_id")} store={store} link={link} selectLink={selectLink} />
    });

    return (
      <div>
        <Panel>
          <Row>
            {links}
          </Row>
        </Panel>
      </div>
    );
  }
});

module.exports = Links;
