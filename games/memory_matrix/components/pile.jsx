var React = require('react');
var ReactDOM = require('react-dom');


var Pile = React.createClass({
  getInitialState: function () {
    return({
      active: 0
    });
  },

  open: function () {
    if(this.props.active === 1){
      this.setState({
        active: 1
      });
    } else {
      this.setState({
        active: 2
      });
    }
  },

  render: function () {
    var style = "";

    if(this.state.active === 1){
      style += "animated flipInX correct";
    } else if (this.state.active === 2){
      style += "animated flipInX false";
    }

    return(
      <div className={style} onClick={this.open}>

      </div>
    );
  }
});

module.exports = Pile;
