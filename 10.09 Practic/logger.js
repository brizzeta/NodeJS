import fs from 'fs';
import { promisify } from 'util';

export default class Logger {
  constructor(filename) {
    this.filename = filename;
  }

  _formatLog(level, message) {
    return `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}\n`;
  }

  _writeSync(level, message) {
    const log = this._formatLog(level, message);
    fs.appendFileSync(this.filename, log);
  }

  _writeAsync(level, message) {
    const log = this._formatLog(level, message);
    return promisify(fs.appendFile)(this.filename, log);
  }

  infoSync(message) {
    this._writeSync('info', message);
  }

  warnSync(message) {
    this._writeSync('warn', message);
  }

  errSync(message) {
    this._writeSync('err', message);
  }

  async infoAsync(message) {
    await this._writeAsync('info', message);
  }

  async warnAsync(message) {
    await this._writeAsync('warn', message);
  }

  async errAsync(message) {
    await this._writeAsync('err', message);
  }

  readLogsSync() {
    return fs.readFileSync(this.filename, 'utf8');
  }

  readLogsAsync() {
    return promisify(fs.readFile)(this.filename, 'utf8');
  }
}