// Quy luật
// 1. THêm chuỗi secret key vào cuối
// 2. Đảo ngược chuỗi

const SECRETKEY = "abcxyz";

function encrypt(input) {
  const inputWithPadding = input + SECRETKEY;
  const output = inputWithPadding.split("").reverse().join("");
  return output;
}

// encrypt("vantu");

function decrypt(input) {
  const textDecrypt = input.split("").reverse().join("");

  return textDecrypt.slice(0, textDecrypt.length - SECRETKEY.length);
}

const encryptText = encrypt("tu1234567890");
const decryptText = decrypt(encryptText);
console.log(encryptText, decryptText);
