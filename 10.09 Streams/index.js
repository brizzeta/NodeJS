import fs from 'fs'
import { promisify } from 'util';
import path from 'path';

const setTimeoutPromise = promisify(setTimeout);

async function readFileStream(filePath) {
  const readStream = fs.createReadStream(filePath, { encoding: 'utf8', highWaterMark: 1 });

  for await (const chunk of readStream) {
    process.stdout.write(chunk);
    await setTimeoutPromise(100);
  }
}

readFileStream('test.txt').catch(error => console.error('Error:', error));