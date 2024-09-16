import EventEmitter from 'events';

export default class Logger extends EventEmitter {
    log(message) {
      this.emit('log', 'INFO', message);
    }
  
    warn(message) {
      this.emit('log', 'WARNING', message);
    }
  
    error(message) {
      this.emit('log', 'ERROR', message);
    }
  }
  