import Game from '../src/Game.js';
import BonusWheel from '../src/bonusWheel.js';
import domUpdates from '../src/domUpdates.js';
import Wheel from '../src/Wheel.js';
import chai from 'chai';
import spies from 'chai-spies';

const expect = chai.expect;
chai.use(spies);
chai.spy.on(domUpdates, [
  'disableKeyboard', 'updateRound', 
  'appendWheel', 'toggleKeyboard', 
  'displayCorrectLetter', 'scoreUpdate', 
  'displayDetails', 'appendPuzzle', 
  'clearBoard', 'updateTurn'], () => true);


describe('Game', function() {
  let game;
  beforeEach(function() {
    game = new Game();
  });

  it('instantiates our good friend, Game', function() {
    expect(game).to.be.an.instanceof(Game);
  })

  it('should have default parameters', () => {
    expect(game.round).to.equal(0);
    expect(game.players).to.deep.equal([]);
    expect(game.currentPlayer).to.equal(0);
    expect(game.roundWheel).to.equal(null);
    expect(game.bonusWheel).to.deep.equal([]);
    expect(game.roundPuzzle).to.deep.equal([]);
    expect(game.splitPuzzle).to.deep.equal([]);
  })

  it('should be able to create new players', function() {
    const playersArray = ["Josh", "Jake", "Pam"];

    expect(game.players.length).to.equal(0);
    game.createPlayers(playersArray);
    expect(game.players.length).to.equal(3);
  })

  it('should increase round number', function() {
    expect(game.round).to.equal(0)
    game.newRound();
    expect(game.round).to.equal(1);
  })
  
  it('should be able to create a new wheel', function() {
    expect(game.roundWheel).to.not.be.an('object');
    game.newRound();
    expect(game.roundWheel).to.be.an('object');
  })

  it('should be able to create a wheel with six elements', function() {
    expect(game.roundWheel).to.deep.equal(null);
    game.newRound();
    expect(game.roundWheel.wheelElements).to.have.a.lengthOf(6);
  })

  it('should be able to create a new puzzle', function() {
    expect(game.roundPuzzle).to.deep.equal([]);
    game.newRound();
    expect(game.roundPuzzle).to.be.an('object');
  })

  it('should be able to randomly choose a puzzle bank', function() {
    expect(game.roundPuzzle).to.deep.equal([]);
    game.newRound();
    expect(game.roundPuzzle.difficulty).to.be.an('object');
  })

  it('should be able to randomly choose a puzzle from the bank', function() {
    expect(game.roundPuzzle).to.deep.equal([]);
    game.newRound();
    expect(game.roundPuzzle.puzzleDetails).to.be.an('object');
    expect(game.roundPuzzle.answer).to.be.an('string');
    expect(game.roundPuzzle.category).to.be.an('string');
  })

  it('should be able to turn the answer into an array of letters', function() {
    expect(game.roundPuzzle).to.deep.equal([]);
    game.newRound();
    let puzzleDetails = game.roundPuzzle.displayPuzzle();
    expect(puzzleDetails).to.be.an('array');
  })

  it('should move to the next player\'s turn', function() {
    expect(game.currentPlayer).to.equal(0);
    const names = ['Josh', 'Jake', 'Pam'];
    game.createPlayers(names);
    game.cyclePlayers();
    expect(game.currentPlayer).to.equal(1);
  })

  it('should be player one\'s turn after player three', function() {
    expect(game.currentPlayer).to.equal(0);
    const names = ['Josh', 'Jake', 'Pam'];
    game.createPlayers(names);


    game.cyclePlayers();
    game.cyclePlayers();
    expect(game.currentPlayer).to.equal(2);
    game.cyclePlayers();
    expect(game.currentPlayer).to.equal(0);
  })

  it('should create a bonus wheel when the round is greater than four', function() {
    game.newRound();
    expect(game.round).to.equal(1);
    expect(game.bonusWheel).to.deep.equal([]);
    game.newRound();
    game.newRound();
    game.newRound();
    expect(game.round).to.equal(4);
    game.newRound();
    expect(game.round).to.equal(5);
    expect(game.bonusWheel).to.be.an.instanceof(Wheel);
  })

});






