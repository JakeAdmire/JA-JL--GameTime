// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file

// Tell webpack to use a CSS file
import './css/base.css';

//  Tell webpack to use an image (link to it in index.html)
import './images/background.jpg';
import './images/001-hills.svg';
import './images/002-waterfall.svg';
import './images/003-mill.svg';

// Tell webpack to use a JS file
import domUpdates from './domUpdates.js';
import Game from './Game.js';
import $ from 'jquery';


// jQuery Variables

let game;


$('body').keypress(function(e) {
  if (e.keyCode === 13) {
    return false;
  }
});

$('.hidden-popup').hide();

$('.consonant, .vowel').on('click', (event) => {
  game.guessLetter(event);
})

$('.submit-names').on( 'click', (e) => {
  e.preventDefault();
  if ( $('#player1')[0].value && $('#player2')[0].value && 
  $('#player3')[0].value ) {
    game = new Game();
    buildGame();
    domUpdates.fadeNameInput();
    domUpdates.disableBuyVowel();
  } else {
    // $promptWarning.toggle;
  }
});

$('.spin-wheel').on('click', () => {
  game.implementWheelResults();

})

$('.buy-vowel').on('click', (e) => {
  e.preventDefault();
  game.buyVowel();
})

$('.solve-puzzle').on('click', () => {
  
})

function buildGame() {
  createPlayerNames();
  game.newRound();
}

function createPlayerNames() {
  const playerNames = [];
  playerNames.push($('#player1')[0].value);
  playerNames.push($('#player2')[0].value);
  playerNames.push($('#player3')[0].value);
  game.createPlayers(playerNames);
  domUpdates.displayPlayerNames();
}