import EventEmitter from 'events';

/// Task 1
const emitter1 = new EventEmitter();

emitter1.on('click', () => {
  console.log('Клік');
});

emitter1.on('click', () => {
  console.log('Клік 2');
});

emitter1.on('click', () => {
  console.log('Клік 3');
});

emitter1.emit('click');


// Task 2

const emitter2 = new EventEmitter();

const handler1 = () => console.log('Помилка 1');
const handler2 = () => console.log('Помилка 2');
const handler3 = () => console.log('Помилка 3');

emitter2.on('error', handler1);
emitter2.on('error', handler2);
emitter2.on('error', handler3);

console.log('Перед видаленням:');
emitter2.emit('error');

emitter2.removeListener('error', handler2);

console.log('\nПісля видалення:');
emitter2.emit('error');


// Task 3
import Dice from './Dice.js';

const dice = new Dice();

dice.on('rolled', (result) => {
    console.log(`Випало: ${result}`);
});
  
console.log('Кидаємо кубик:');
dice.roll();



// Task 4
import Logger from './Logger.js';

const logger = new Logger();

logger.on('log', (level, message) => {
  console.log(`[${level}] ${message}`);
});

logger.log('Запуск');
logger.warn('Закінчується вільне місце');
logger.error('Не вдалося підключитися');