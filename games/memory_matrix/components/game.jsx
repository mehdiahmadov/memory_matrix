var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./board');
var Info = require('./info');
var Levels = require('./levels');
var Tile = require('./tile');
var Modal = require('boron/WaveModal');
var TimerMixin = require('react-timer-mixin');

var Game = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function () {
    return({
      level: Levels[1],
      tiles: [],
      game: undefined,
      founded: [],
      score: 0
    });
  },

  componentDidUpdate: function(){
    if (this.state.tiles.length === 0){
      this.runBoard();
    }
  },

  runBoard: function () {
    this.generateBoard();
    this.setTimeout( function() {
      this.closeBoard();
    }.bind(this), this.state.level.time);
  },

  levelUp: function () {
    var maxLevel = Object.keys(Levels).length;
    var currentLevel = this.state.level.id;
    if( currentLevel === maxLevel ){
      this.showModal();
    } else {
      currentLevel++;
      this.setState({
        level: Levels[currentLevel],
        tiles: [],
        msg: "",
        founded: []
      });
    }
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

  move: function (id, active) {
    this.openTile(id);
    if (active === 0){
      this.gameOver();
    } else if (active === 1) {
      this.addFounded(id);
      if (this.state.founded.length === this.state.level.active){
        this.won();
      }
    }
  },

  addFounded: function (id){
    if( this.state.founded.indexOf(id) === -1 ){
      var arr = this.state.founded;
      arr.push(id);
      this.setState({
        founded: arr
      });
      this.addScore(10);
    }
  },

  addScore: function(add) {
    this.setState({
      score: (this.state.score + add)
    });
  },

  generateBoard: function () {
      if (this.state.tiles.length !== 0){
        return;
      }

    var tileState = 0;
    var activeTiles = this.state.level.active;
    var tilesNumber = this.state.level.tiles;
    var board = this.state.level.board;
    var tiles = [];
    for (var i = 0; i < tilesNumber; i++) {
      if ( activeTiles > 0 ) {
        tileState = 1;
        activeTiles--;
      }
      tiles.push(
            <Tile active={tileState}
                  status={1}
                  id={i}
                  key={i}
                  move={ function() {} }
                  />
            );
      tileState = 0;
    }
    tiles = this.shuffleArray(tiles);
    this.setState({
      tiles: tiles
    });
  },

  openBoard: function () {
    var tiles = this.state.tiles.map(function(tile){
      return(
        <Tile active={tile.props.active}
              status={1}
              key={tile.props.id}
              move ={ function() {} }
              />
      );
    });

    this.setState({
      tiles: tiles
    });
  },

  closeBoard: function () {
    var tiles = this.state.tiles.map(function(tile){
      return(
        <Tile active={tile.props.active}
              status={0}
              id={tile.props.id}
              key={tile.props.id}
              move={this.move} />
      );
    }, this);

    this.setState({
      tiles: tiles
    });
  },

  openTile: function(id){
    var tiles = this.state.tiles.map(function(tile){
      if ( tile.props.id === id){
        return(
          <Tile active={tile.props.active}
                status={1}
                id={tile.props.id}
                key={tile.props.id}
                move ={ this.move } />
        );
      } else {
        return tile;
      }
    }, this);

    this.setState({
      tiles: tiles
    });
  },

  showModal: function (content) {
      this.refs.modal.show();
  },

  hideModal: function () {
      this.refs.modal.hide();
  },

  gameOver: function () {
    this.setState({
      game: 0
    });
    this.openBoard();
    this.showModal();
  },

  won: function () {
    this.setState({
      game: 1
    });
    this.addScore(100);
    this.openBoard();
    this.showModal();
  },

  restart: function () {
    this.setState({
      level: Levels[1],
      tiles: [],
      game: undefined,
      founded: [],
      score: 0
    });
  },

  modalContent: function () {
    if (this.state.game === 1){
      return(
        <div className='modal won'>
        <ul>
          <li><h1>GREAT JOB!</h1></li>
          <li><button onClick={
            function (){
              this.hideModal();
              this.levelUp();
            }.bind(this)
          }>Next Level</button></li>
        </ul>
        </div>
      );
    } else {
      return(
        <div className='modal lost'>
        <ul>
          <li><h1>OOPS! Wrong one :-(</h1></li>
          <li><h1>Your score: {this.state.score}</h1></li>
          <li><button onClick={
            function (){
              this.hideModal();
              this.restart();
            }.bind(this)
          }>Start Again</button></li>
        </ul>
        </div>
      );
    }
  },

  render: function () {
    var instruction;
    if (this.state.game === undefined){
      instruction =
              <div className="instruction" id="instruction">
                <ul>
                  <li><h1>Memory matrix</h1></li>
                  <li>
                    <p>
                      How good is your memory? Try to memorise all the blue tiles and find them all!
                    </p>
                  </li>
                  <li>
                  <li>
                      <button onClick={
                        function (){
                          document.getElementById("instruction").style.display = "none";
                          this.restart();
                        }.bind(this)
                      }>START</button></li>
                  </li>
                  <li><div className="instruction-img"></div></li>
                </ul>
              </div>;
    }
    return(
      <div className="mm-display">
        {instruction}
        <Modal ref="modal" className='modalWindow' >
          {this.modalContent()}
        </Modal>
        <Info game={this.state} />
        <div className="board-container">
          <Board board   = {this.state.level.board}
                 tiles   = {this.state.tiles}
                 id      = {this.state.level.id}
                 />
        </div>
      </div>
    );
  }
});

module.exports = Game;
