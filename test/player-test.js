import chai from 'chai';
import Player from '../src/Player.js'
const expect = chai.expect;


describe('Player', function() {
  let player;
  beforeEach(function() {
    player = new Player();
  });

  it('instantiates our good friend, Player', function() {
    expect(player).to.be.an.instanceOf(Player);
  });

  it('should have default parameters', () => {
    expect(player.totalScore).to.equal(0);
    expect(player.roundScore).to.equal(0);
  })

  it('should reset player\'s round score', function() {
    player.roundScore = 500;
    player.resetScore();
    expect(player.roundScore).to.equal(0);
  });

  it('should subtract $100 when purchasing vowel', function() {
    player.roundScore = 500;
    player.buyVowel();
    expect(player.roundScore).to.equal(400);
  });

  it('should add winner\'s round score to total score', function() {
    player.roundScore = 500;
    player.totalScore = 500;
    player.winRound();
    expect(player.totalScore).to.equal(1000);
  });
});
