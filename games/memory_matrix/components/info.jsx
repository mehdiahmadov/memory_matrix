var React = require('react');
var ReactDOM = require('react-dom');


var Info = React.createClass({
  render: function () {
    return(
      <div id="info">
        <ul>
          <li>TILES 10</li>
          <li>TRIAL 4 of 12</li>
          <li>SCORE 5600</li>
        </ul>
      </div>
    );
  }
});

module.exports = Info;
