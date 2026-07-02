import { ContainerClient, BlockBlobClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob';
import { getContainerClient } from './configStorage';
import { SecureYamlConfig } from '../../config/SecureYamlConfig';

export interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export interface BlobPath {
  project_id: number | string;
  macro: string;
  module: string;
}

export interface BlobResult {
  blobName: string;
  url: string;
}

  const DECRYPTION_KEY = process.env.CONFIG_DECRYPTION_KEY;

  if (!DECRYPTION_KEY) {
    throw new Error('CONFIG_DECRYPTION_KEY no está definida');
  }

  const config = new SecureYamlConfig(DECRYPTION_KEY);

  const AccountName = config.ACCOUNT_NAME;
  const ContainerName = config.CONTAINER_NAME;
  const AccountKey = config.STORAGE_KEY

export class BlobService {
  private containerClient: ContainerClient;
    constructor() {
      this.containerClient = getContainerClient();
    }

    /** Subida de archivos*/
    async uploadFiles(file: UploadedFile, path: BlobPath): Promise<BlobResult> {

      const blobName = `proyectos/${path.project_id}/${path.macro}/${path.module}/${file.originalname}`;

      const blockBlobClient: BlockBlobClient =
        this.containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      return {
        blobName,
        url: blockBlobClient.url
      };
    }

    /** Reemplazar un archivo (generalmente para las actualizaciones) */
    async replaceFiles(file: UploadedFile, blobName: string): Promise<BlobResult> {

      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      return {
        blobName,
        url: blockBlobClient.url
      };
    }

    /** Eliminación de archivos **/
    async deleteFiles(blobName: string): Promise<{ deleted: boolean; message?: string }> {

      const blobClient = this.containerClient.getBlobClient(blobName);

      const exists = await blobClient.exists();
      if (!exists) {
        return { deleted: false, message: 'Archivo no existe' };
      }

      await blobClient.delete();

      return { deleted: true };
    }

    /** descarga de archivos */
    async getFileStream(filePath: string) {
      const blockBlobClient = this.containerClient.getBlockBlobClient(filePath);

      const response = await blockBlobClient.download();

      return {
        stream: response.readableStreamBody,
        contentType: response.contentType
      };
    }

    /** Visualización de archivos */
    getFileSasUrl(filePath: string): string {
      const sharedKeyCredential =
      new StorageSharedKeyCredential(
        AccountName,
        AccountKey
      );

    console.log('blobName:', filePath);

    const sasToken =
      generateBlobSASQueryParameters(
        {
          containerName: ContainerName,
          blobName: filePath,
          permissions:
            BlobSASPermissions.parse('r'),
          startsOn: new Date(Date.now() - 5 * 60 * 1000),
          expiresOn: new Date(
            Date.now() + (15 * 60 * 1000)
          )
        },
        sharedKeyCredential
      ).toString();

      return `https://${AccountName}.blob.core.windows.net/${ContainerName}/${filePath}?${sasToken}`
    }


    async uploadUserProfileImage(file: UploadedFile, path: string): Promise<BlobResult> {

      const blockBlobClient: BlockBlobClient =
        this.containerClient.getBlockBlobClient(path);

      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: {
          blobContentType: file.mimetype
        }
      });

      return {
        blobName: path,
        url: blockBlobClient.url
      };
    }
}