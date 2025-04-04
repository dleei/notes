import CryptoJS from 'crypto-js';

const md5Password = (password) => {
  return CryptoJS.MD5(password).toString();
};

export default md5Password;