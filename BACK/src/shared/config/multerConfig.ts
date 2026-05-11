import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

// Usamos memoria porque luego lo mandamos a Blob
const storage = multer.memoryStorage();

// Validación de tipos de archivo
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {

  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'));
  }
};

// Límite de tamaño (ejemplo: 5MB)
const limits = {
  fileSize: 5 * 1024 * 1024
};

// Configuración base
const multerConfig = multer({
  storage,
//   fileFilter,
  limits
});

export default multerConfig;