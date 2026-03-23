import { ContainerClient, BlockBlobClient } from '@azure/storage-blob';

export interface UploadedFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export interface BlobPath {
  idprojects: number | string;
  macro: string;
  module: string;
}

export interface BlobResult {
  blobName: string;
  url: string;
}

export class BlobService {

    constructor(private readonly containerClient: ContainerClient) {}


    /** Subida de archivos*/
  async uploadFiles(file: UploadedFile, path: BlobPath): Promise<BlobResult> {

    const blobName = `proyectos/${path.idprojects}/${path.macro}/${path.module}/${file.originalname}`;

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
}