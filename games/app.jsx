var React = require('react');
var ReactDOM = require('react-dom');
var Display = require('./memory_matrix/components/display');

var App = React.createClass({
  render: function () {
    return(
      <div className="display">
        <Display />
      </div>
    );
  }
});

module.exports = App;
