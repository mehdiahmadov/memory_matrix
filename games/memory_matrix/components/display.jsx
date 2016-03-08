var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./board');
var Info = require('./info');


var Display = React.createClass({
  render: function () {
    return(
      <div className="mm-display">
        <Info />
        <div className="board-container">
          <Board />
        </div>
      </div>
    );
  }
});

module.exports = Display;
