// Stylesheets
import './css/base.css';

//  Images
import './images/background3.jpg';
// import './images/favicon.ico';
import './images/001-hills.svg';
import './images/002-waterfall.svg';
import './images/003-mill.svg';

// JS files
import domUpdates from './domUpdates.js';
import Game from './Game.js';
import $ from 'jquery';


let game;

$('body').keypress(function(e) {
  if (e.keyCode === 13) {
    return false;
  }
});

$('.hidden-popup').hide();

$('.end-game').on('click', () => {
  location.reload();
})

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
    domUpdates.updateTurn('2', '0');
  } else {
    $('.name-input-form').append(
      '<p class="error">* Please fill out all fields *</p>');
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
  domUpdates.displaySolvePuzzle();
  $('.submit-answer').on('click', () => {
    if (game.roundPuzzle.answer.toUpperCase() === 
    $('.puzzle-guess').val().toUpperCase()) {
      game.endRound();
      domUpdates.removeSolvePuzzle();
    } else {
      domUpdates.removeSolvePuzzle();
      game.cyclePlayers();
    }
  })
})

function buildGame() {
  createPlayerNames();
  game.newRound();
  game.players.forEach((player, i) => {
    domUpdates.totalScoreUpdate(i, '0');
  });
}

function createPlayerNames() {
  const playerNames = [];
  playerNames.push($('#player1')[0].value);
  playerNames.push($('#player2')[0].value);
  playerNames.push($('#player3')[0].value);
  game.createPlayers(playerNames);
  domUpdates.displayPlayerNames();
}