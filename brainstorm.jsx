var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./games/app');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('game'));
});
