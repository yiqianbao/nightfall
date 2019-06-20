 global.generateRandomSerial = function () {
  const seed = "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF012345";
  let serialNumber = "0x";
  for(var index = 0; index < 54; index++) {
    serialNumber += seed.charAt(Math.floor(Math.random() * seed.length));
  }
  console.log("Serial Number ::: " + serialNumber);
  return serialNumber;
};

//require('./api-gateway.test');
//require('./ft.test');
require('./coin.test');
//require('./nft.test');
//require('./token.test');
//require('./teardown');



