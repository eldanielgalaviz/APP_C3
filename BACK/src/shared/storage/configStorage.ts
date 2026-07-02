import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import { SecureYamlConfig } from '../../config/SecureYamlConfig';

let containerClient: ContainerClient;

export const initBlobStorage = async (): Promise<void> => {
  const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;

  if (!DECRYPTION_KEY) {
    throw new Error('CONFIG_DECRYPTION_KEY no está definida');
  }

  const config = new SecureYamlConfig(DECRYPTION_KEY);

  const ContainerName = config.CONTAINER_NAME;
  const StorageConnection = config.AZURE_STORAGE_CONNECTION_STRING;
  
  const blobServiceClient = BlobServiceClient.fromConnectionString(StorageConnection);
  containerClient = blobServiceClient.getContainerClient(ContainerName);
};

export const getContainerClient = (): ContainerClient => {
  if (!containerClient) {
    throw new Error('BlobStorage no inicializado');
  }
  return containerClient;
};