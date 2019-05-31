import { Injectable } from '@angular/core';

/**
 * 
 * Util service is for common resusable methods.
 * 
 */
@Injectable()
export class UtilService {
  
  constructor() {
  }

  /**
   * Method to generate random hex string.
   */
  generateRandomSerial () {
    const seed = "0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF012345";
    let serialNumber = "0x";
    for(var index = 0; index < 54; index++) {
      serialNumber += seed.charAt(Math.floor(Math.random() * seed.length));
    }
    console.log("Serial Number ::: " + serialNumber);
    return serialNumber;
  }

  /**
   * Method to convert Hex to Number.
   * 
   * @param hex Hex string
   */
  convertToNumber (hex: string) {
    return Number(hex);
  }
  
}
