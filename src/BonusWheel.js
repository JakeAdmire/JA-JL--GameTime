import Wheel from './Wheel.js'

class BonusWheel extends Wheel {
  constructor() {
    super();
    this.prizes = [
      'Trip to Ohio', 
      '2 dollar bill', 
      '7 Eleven Rewards card', 
      'Food court hot dog', 
      'A goat of your choosing'
    ];
  }
  spinBonusWheel() {
    let randomIndex = Math.floor(Math.random() * this.prizes.length);
    this.prizes[randomIndex];
  }
}

export default BonusWheel;