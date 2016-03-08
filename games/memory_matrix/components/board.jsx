var React = require('react');
var ReactDOM = require('react-dom');
var Pile = require('./pile');

var Board = React.createClass({

  getInitialState: function() {
    return({
      piles: []
    });
  },

  componentDidMount: function () {
    this.generateBoard();
  },

  shuffleArray: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
      return array;
  },

  generateBoard: function () {
    var pileState = 0;
    var activePiles = 3;
    var piles = [];

    for (var i = 0; i < 81; i++) {
      if ( activePiles > 0 ) {
        pileState = 1;
        activePiles--;
      }
      piles.push(<li className="pile"><Pile active={pileState} key={i}/></li>);
      pileState = 0;
    }

    piles = this.shuffleArray(piles);

    this.setState({
      piles: piles
    });

  },


  render: function () {

    return(
      <div className="board">
        <ul className="pile-container xxxl">
          {this.state.piles}
        </ul>
      </div>
    );
  }
});

module.exports = Board;
