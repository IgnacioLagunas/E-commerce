import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = join(dirname(fileURLToPath(import.meta.url)), '..');

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
