var React = require('react');
var ReactDOM = require('react-dom');


var Info = React.createClass({
  render: function () {

    var instruction;
    if (this.props.game.game === undefined || this.props.game.level.id < 3){
        instruction =
            <div className="ingame-instruction">
              <ul>
                <li>1. Memorize the pattern and location of the blue tiles.</li>
                <li>2. After they turn yellow find blue tiles and click on them.</li>
              </ul>
            </div>;
    }

    var splash;
    if (this.props.game.game === undefined){
      splash =
              <div className="instruction" id="instruction">
                <ul>
                  <li><h1>Memory matrix</h1></li>
                  <li>
                    <p>
                      How good is your memory? Try to memorize the pattern and find all the blue tiles!
                    </p>
                  </li>
                  <li>
                  <li>
                      <button onClick={
                        function (){
                          document.getElementById("instruction").style.display = "none";
                          this.props.restart();
                        }.bind(this)
                      }>START</button></li>
                  </li>
                  <li><div className="instruction-img"></div></li>
                </ul>
              </div>;
    }


    return(
      <div className="info">
      {splash}
        <ul>
          <li>{"LEVEL " + this.props.game.level.id}</li>
          <li>{"TILES " + this.props.game.founded.length  + " of " + this.props.game.level.active}</li>
          <li>{"SCORE " + this.props.game.score}</li>
        </ul>
        {instruction}
      </div>
    );
  }
});

module.exports = Info;
