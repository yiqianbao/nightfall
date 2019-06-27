

/**
 * Method to generate salt.
 */
module.exports.generateSalt = () => {
  let random = Math.random();
  if (random < 0.1) {
    random += 0.1;
  }
  return `0x${((0.1 + random) * 1000000000000000000000000000000e35).toString(16)}`;
}

/**
 * Method to generate tokenID.
 * while ERC-721 mint.
 */
module.exports.generateTokenID = () => `0x${(Math.random() * 1000000000000000000000000000000e46).toString(16)}`;

/**
 * Method to Number to Hexadecimal.
 * 
 * @param num Number
 */
module.exports.numberToHexString = (num) => {
  var hexValue = (num).toString(16);
  var hexString = '0x' + hexValue.padStart(32,"0");
  return hexString;
}
