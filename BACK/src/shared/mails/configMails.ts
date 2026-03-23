import { Client } from "@microsoft/microsoft-graph-client";
import { ClientSecretCredential } from "@azure/identity";

import { SecureYamlConfig } from "../config/SecureYamlConfig";
import * as dotenv from 'dotenv';
dotenv.config();

import "isomorphic-fetch";

export async function configMails(){
    const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;
    if (!DECRYPTION_KEY) {
      throw new Error('CONFIG_DECRYPTION_KEY no está definida. Revisa tu archivo .env');
    }

    const config = new SecureYamlConfig(DECRYPTION_KEY);
    const credential = new ClientSecretCredential(config.TENANTID, config.CLIENTMAILID, config.SECRETIDMAIL);

    const client = Client.initWithMiddleware({
        authProvider: {
            getAccessToken: async () => {
            const token = await credential.getToken('https://graph.microsoft.com/.default');
            return token.token;
            }
        }
    });

    return client;
}