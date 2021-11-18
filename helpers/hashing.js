const CryptoJS = require("crypto-js");

const encrypt = (password) => {
  return CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRET_KEY
  ).toString();
};
const decrypt = (hashedpassword) => {
  return CryptoJS.AES.decrypt(
    hashedpassword,
    process.env.CRYPTO_SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
};

module.exports = { encrypt, decrypt };
