import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { SecureYamlConfig } from '../config/SecureYamlConfig';

let containerClient: ContainerClient;

export const initBlobStorage = async (): Promise<void> => {
  const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;

  if (!DECRYPTION_KEY) {
    throw new Error('CONFIG_DECRYPTION_KEY no está definida');
  }

  const config = new SecureYamlConfig(DECRYPTION_KEY);

  const AccountName = config.ACCOUNT_NAME;
  const ContainerName = config.CONTAINER_NAME;
  const SASToken = config.SAS_TOKEN;

  const blobServiceClient = new BlobServiceClient(
    `https://${AccountName}.blob.core.windows.net/?${SASToken}`
  );

  containerClient = blobServiceClient.getContainerClient(ContainerName);
};

export const getContainerClient = (): ContainerClient => {
  if (!containerClient) {
    throw new Error('BlobStorage no inicializado');
  }
  return containerClient;
};