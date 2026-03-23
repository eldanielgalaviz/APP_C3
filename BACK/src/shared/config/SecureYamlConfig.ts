import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import CryptoJS from 'crypto-js';

/**
 * Interfaz de configuración (Puerto)
 * Mismo orden que app.config.yaml
 */
export interface ConfigPort {
  readonly PORT: number;
  readonly DATABASE: string;
  readonly HOST: string;
  readonly USER: string;
  readonly PASSWORD: string;
  readonly APP_CLIENTID: string;
  readonly TENANTID: string;
  readonly SECRETVALUE: string;
  readonly LISTID: string;
  readonly DAYS_TIME: string;
  readonly AIRTABLE_ACCESSTOKEN: string;
  readonly TABLE_ID: string;
  readonly ENV: 'development' | 'production' | 'test';
  readonly SECRETMAILVALUE: string;
  readonly CLIENTMAILID: string;
  readonly SECRETIDMAIL: string;
  readonly SEND_NOTIFICATIONS: boolean;
  readonly PORTFOLIO_EMAIL: string;
  readonly ADMIN_NOTIFICATION_EMAIL: string;
  readonly ACCOUNT_NAME: string;
  readonly SAS_TOKEN: string;
  readonly CONTAINER_NAME: string;
}

export class SecureYamlConfig implements ConfigPort {
  private readonly configData: any;
  private readonly decryptionKey: string;

  constructor(decryptionKey: string) {
    this.decryptionKey = decryptionKey;
    const filePath = path.resolve(process.cwd(), 'config', 'app.config.yaml');

    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo de configuración no encontrado: ${filePath}`);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    this.configData = yaml.parse(fileContent);

    if (!this.configData) {
      throw new Error('El archivo YAML está vacío o tiene formato inválido');
    }

    this.validateRequiredFields();
  }

  // === Getters que coinciden con ConfigPort y el orden de app.config.yaml ===

  get PORT(): number {
    return this.configData.PORT;
  }

  get DATABASE(): string {
    return this.decrypt(this.configData.DATABASE);
  }

  get HOST(): string {
    return this.decrypt(this.configData.HOST);
  }

  get USER(): string {
    return this.decrypt(this.configData.USER);
  }

  get PASSWORD(): string {
    return this.decrypt(this.configData.PASSWORD);
  }


  get APP_CLIENTID(): string {
    return this.decrypt(this.configData.APP_CLIENTID);
  }

  get TENANTID(): string {
    return this.decrypt(this.configData.TENANTID);
  }

  get SECRETVALUE(): string {
    return this.decrypt(this.configData.SECRETVALUE);
  }

  get LISTID(): string {
    return this.decrypt(this.configData.LISTID);
  }

  get DAYS_TIME(): string {
    return this.configData.DAYS_TIME;
  }

  get AIRTABLE_ACCESSTOKEN(): string {
    return this.decrypt(this.configData.AIRTABLE_ACCESSTOKEN);
  }

  get TABLE_ID(): string {
    return this.decrypt(this.configData.TABLE_ID);
  }

  get ENV(): 'development' | 'production' | 'test' {
    return this.configData.ENV || 'development';
  }

  get SECRETMAILVALUE(): string {
    return this.decrypt(this.configData.SECRETMAILVALUE);
  }  
  
  get CLIENTMAILID(): string {
    return this.decrypt(this.configData.CLIENTMAILID);
  }  

  get SECRETIDMAIL(): string {
    return this.decrypt(this.configData.SECRETIDMAIL);
  }

  get SEND_NOTIFICATIONS(): boolean {
    return this.configData.SEND_NOTIFICATIONS === 'true';
  }

  get PORTFOLIO_EMAIL(): string {
    return this.decrypt(this.configData.PORTFOLIO_EMAIL);
  }

  get ADMIN_NOTIFICATION_EMAIL(): string {
    return this.decrypt(this.configData.ADMIN_NOTIFICATION_EMAIL);
  }

  get ACCOUNT_NAME(): string {
    return this.decrypt(this.configData.ACCOUNT_NAME);
  }

  get SAS_TOKEN(): string {
    return this.decrypt(this.configData.SAS_TOKEN);
  }

  get CONTAINER_NAME(): string {
    return this.decrypt(this.configData.CONTAINER_NAME);
  }
  
  /**
   * Descifra un valor si está marcado como ENC:
   * Formato esperado: ENC:<ciphertext-base64>::<iv-hex>
   */
  private decrypt(encryptedValue: string): string {
  if (typeof encryptedValue !== 'string') {
    throw new Error(`Valor no es string: ${encryptedValue}`);
  }

  if (!encryptedValue.startsWith('ENC:v1:')) {
    return encryptedValue;
  }

  try {
    // Extraer cipherText::iv
    const base64IvPart = encryptedValue.slice('ENC:v1:'.length);
    const [cipherTextB64, ivHex] = base64IvPart.split('::');

    if (!cipherTextB64 || !ivHex) {
      throw new Error('Formato inválido');
    }

    if (!/^[A-Za-z0-9+/=]+$/.test(cipherTextB64)) {
      throw new Error('Base64 inválido');
    }

    if (!/^[a-f0-9]{32}$/i.test(ivHex)) {
      throw new Error('IV no es hex válido');
    }

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const key = CryptoJS.SHA256(this.decryptionKey);
    const cipherText = CryptoJS.enc.Base64.parse(cipherTextB64);

    const decrypted = CryptoJS.AES.decrypt(
      CryptoJS.lib.CipherParams.create({ ciphertext: cipherText }),
      key,
      { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const plainText = decrypted.toString(CryptoJS.enc.Utf8);
    if (!plainText) {
      throw new Error('Descifrado vacío (clave incorrecta)');
    }

    return plainText;
  } catch (error) {
    console.error('❌ Error al descifrar:', encryptedValue);
    throw error;
  }
}
  private validateRequiredFields(): void {
    const required = [
      'PORT',
      'DATABASE',
      'HOST',
      'USER',
      'PASSWORD',
      'APP_CLIENTID',
      'TENANTID',
      'ENV',
      'SECRETMAILVALUE',
      'CLIENTMAILID',
      'SECRETIDMAIL',
      'PORTFOLIO_EMAIL',
      'ADMIN_NOTIFICATION_EMAIL',
      'ACCOUNT_NAME',
      'SAS_TOKEN',
      'CONTAINER_NAME',
    ];

    for (const field of required) {
      if (this.configData[field] === undefined) {
        throw new Error(`Campo requerido faltante en configuración: ${field}`);
      }
    }
  }
}