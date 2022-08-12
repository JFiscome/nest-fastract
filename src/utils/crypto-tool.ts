import * as crypto from 'crypto';

export function md5(text) {
  console.log('this is text', text);
  return crypto.createHash('md5').update(text).digest('hex');
}

export function sha1(text) {
  return crypto.createHash('sha1').update(text).digest('hex');
}

export function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}