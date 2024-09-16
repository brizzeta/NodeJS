import EventEmitter from 'events';

export default class Dice extends EventEmitter {
    roll() {
      const result = Math.floor(Math.random() * 6) + 1;
      this.emit('rolled', result);
    }
}