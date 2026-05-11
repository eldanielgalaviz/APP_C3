import multerConfig from "../config/multerConfig";

export const uploadFields = multerConfig.fields([
  { name: 'docPhina', maxCount: 1 },
  { name: 'docInterFlat', maxCount: 1 },
  { name: 'DocAP', maxCount: 1 }
]);

export const uploadPedFields = multerConfig.fields([
  { name: 'docPedFile', maxCount: 1 },
]);

// Para múltiples archivos del mismo tipo (dinámico)
export const uploadArray = multerConfig.array('files', 10);