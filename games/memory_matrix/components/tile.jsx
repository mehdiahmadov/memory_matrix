var React = require('react');
var ReactDOM = require('react-dom');

var Tile = React.createClass({

  move: function () {
    this.props.move(this.props.id, this.props.active);
  },

  render: function () {
    var style = "";

    if(this.props.status === 1){
      if(this.props.active === 1) {
        style += "animated correct";
      } else {
        style += "animated false";
      }
    } else {
       style += "animated flash closed";
    }

    return(
      <div className={style} onClick={this.move}></div>
    );
  }

});

module.exports = Tile;
