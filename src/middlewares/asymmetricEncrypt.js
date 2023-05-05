const crypto = require("crypto");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// Encrypt data with public key
function encrypt(plainText) {
  const cipherText = crypto
    .publicEncrypt(
      {
        key: publicKey,
        oaepHash: "sha256",
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(plainText)
    )
    .toString("base64");

  return cipherText;
}

// Decrypt data with private key
function decrypt(cipherText) {
  const plainText = crypto
    .privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(cipherText, "base64")
    )
    .toString();
  return plainText;
}

const encryptText = encrypt("Xu1234567890");
const decryptText = decrypt(encryptText);
// console.log({
//   encryptText,
//   decryptText,
// });
