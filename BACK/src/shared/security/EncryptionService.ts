import CryptoJS from 'crypto-js';

export class EncryptionService {
  private static getEncryptionKey(): CryptoJS.lib.WordArray {
    const secretPwd = process.env.SECRET_PWD || '5y5Fj5k980FlqUtd8psd';
    
    const hash = CryptoJS.SHA256(secretPwd).toString(CryptoJS.enc.Base64);
    const key = hash.substr(0, 32);
    
    return CryptoJS.enc.Utf8.parse(key);
  }

  private static IV = CryptoJS.enc.Utf8.parse('1234567890123456'); 

  static decryptObject(encryptedData: string): any {
    try {
      
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        this.getEncryptionKey(),
        {
          iv: this.IV,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
      

      if (!decryptedString || decryptedString.trim() === '') {
        throw new Error('Decryption failed - empty result');
      }

      const parsed = JSON.parse(decryptedString);
      
      return parsed;
      
    } catch (error) {
      console.error('Error in decryption:', error);
      throw new Error('Invalid encrypted data');
    }
  }

  static encryptObject(obj: any): string {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(obj),
      this.getEncryptionKey(),
      {
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString();
    
    return encrypted;
  }
}