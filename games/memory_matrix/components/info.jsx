var React = require('react');
var ReactDOM = require('react-dom');


var Info = React.createClass({
  render: function () {
    return(
      <div id="info">
        <ul>
          <li>{"LEVEL " + this.props.game.level.id}</li>
          <li>{"TILES " + this.props.game.founded.length  + " of " + this.props.game.level.active}</li>
          <li>{"SCORE " + this.props.game.score}</li>
        </ul>
      </div>
    );
  }
});

module.exports = Info;
