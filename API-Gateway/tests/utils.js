

/**
 * Method to generate random hex string.
 */
const generateRandomSerial = () =>{
  const seed = "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF012345";
  let serialNumber = "0x";
  for(var index = 0; index < 54; index++) {
    serialNumber += seed.charAt(Math.floor(Math.random() * seed.length));
  }
  return serialNumber;
}

/**
 * Method to convert Hex to Number.
 * 
 * @param hex Hex string
 */
const convertToNumber = (hex) =>{
  return Number(hex);
}


const convertToHex = (num)=>{
  var hexValue = (num).toString(16);
  var hexString = '0x' + hexValue.padStart(32,"0");
  return hexString;
}

const getBalance = (tokenOne,tokenTwo, transferAmount) =>{
  let tokenOneValue  = convertToNumber(tokenOne);
  let tokenTwoValue  = convertToNumber(tokenTwo);
  let balance  = (tokenOneValue + tokenTwoValue) - transferAmount;
  return convertToHex(balance);
}



module.exports = {
  generateRandomSerial,
  convertToNumber,
  convertToHex,
  getBalance
}