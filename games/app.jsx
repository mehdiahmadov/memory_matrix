var React = require('react');
var ReactDOM = require('react-dom');
var Game = require('./memory_matrix/components/game');

var App = React.createClass({
  render: function () {
    return(
      <div className="display">
        <Game />
      </div>
    );
  }
});

module.exports = App;
