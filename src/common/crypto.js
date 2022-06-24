import crypto from 'crypto';

const iv = Buffer.alloc(12, 0); //初始化向量

export function cipherFunc(key, value) { //加密
  const cipher = crypto.createCipheriv('aes-192-gcm', key, iv, { authTagLength: 16 });
  let encrypted = cipher.update(value, 'utf8', 'hex');
  return encrypted;
}

export function decipherFunc(key, value) { //解密
  const decipher = crypto.createCipheriv('aes-192-gcm', key, iv, { authTagLength: 16 });
  let decrypted = decipher.update(value, 'hex', 'utf8');
  return decrypted;
}

export function getKey(value) { //获取钥匙
  let str_num = value + 'wyy'; //钥匙
  let i = 24 - str_num.length;
  while (i--) {
    str_num += '0'
  }
  return str_num;
}