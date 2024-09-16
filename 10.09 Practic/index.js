// task 1
import Logger from './logger.js'

const logger = new Logger('app.log');

logger.infoSync('Інофрмація');
logger.warnSync('Попередження');
logger.errSync('Помилка');

await logger.infoAsync('Асінхрона запис: інформація');
await logger.warnAsync('Асінхрона запис: попередження');
await logger.errAsync('Асінхрона запис: помилка');

console.log(logger.readLogsSync());

console.log(await logger.readLogsAsync());


// task 2

import fs from 'fs';

function countLines(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  console.log(`Файл "${filename}" містить ${lines.length} рядків.`);
}

countLines('test.txt');