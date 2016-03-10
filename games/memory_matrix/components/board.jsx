var React = require('react');
var ReactDOM = require('react-dom');


var Board = React.createClass({

  render: function () {

    var tiles = this.props.tiles.map(function(tile, idx){
      return <li className="tile" key={idx}>{tile}</li>;
    });

    return(
      <div className="board">
        <ul className={ 'tile-container ' + this.props.board}>
            {tiles}
        </ul>
      </div>
    );
  }
});

module.exports = Board;
