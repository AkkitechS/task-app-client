import CryptoJS from "crypto-js";

const SECRET_KEY = "567uhdjkfvsbnfhjdnm,../1234567890-=qwertyuiop[]{}|;':,./<>?";

export const encrypt = (text) => {
  const cipher = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return cipher;
};

export const decrypt = (cipher) => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}