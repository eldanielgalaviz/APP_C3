import { BlobServiceClient } from "@azure/storage-blob";
import { SecureYamlConfig } from "../config/SecureYamlConfig";
import * as dotenv from 'dotenv';
dotenv.config();


export async function configStorage(){
    const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;
    if (!DECRYPTION_KEY) {
      throw new Error('CONFIG_DECRYPTION_KEY no está definida. Revisa tu archivo .env');
    }
    
    const config = new SecureYamlConfig(DECRYPTION_KEY);
    
    const AccountName = config.ACCOUNT_NAME;
    const ContainerName = config.CONTAINER_NAME;
    const SASToken = config.SAS_TOKEN;
    
    const blobServiceClient = new BlobServiceClient(`https://${AccountName}.blob.core.windows.net/?${SASToken}`);
    const containerClient = blobServiceClient.getContainerClient(ContainerName);

    return containerClient;
}
