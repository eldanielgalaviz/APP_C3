import mysql2 from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { SecureYamlConfig } from '../../../config/SecureYamlConfig';
dotenv.config();

const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;
if (!DECRYPTION_KEY) {
  throw new Error('CONFIG_DECRYPTION_KEY no está definida. Revisa tu archivo .env');
}

// Crear instancia de configuración segura
const config = new SecureYamlConfig(DECRYPTION_KEY);
const sslCertPath = path.resolve(__dirname, './azure-combined-root-ca.pem');

const pool = mysql2.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
  port: 3306,
  ssl: {
    ca: fs.readFileSync(sslCertPath),
  },
});

export { pool };