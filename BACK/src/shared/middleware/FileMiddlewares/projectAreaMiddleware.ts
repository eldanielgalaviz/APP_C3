import multerConfig from "../../filesConfig/multerConfig";

export const uploadPolygon = multerConfig.fields([
  { name: 'docPolygon', maxCount: 1 },
]);

export const uploadFields = multerConfig.fields([
  { name: 'docPhina', maxCount: 1 },
  { name: 'docInterFlat', maxCount: 1 },
  { name: 'DocAP', maxCount: 1 }
]);

export const uploadPedFields = multerConfig.fields([
  { name: 'docPedFile', maxCount: 1 },
]);

export const uploadProfileImageFields = multerConfig.fields([
  {
    name: 'profileImage',
    maxCount: 1
  }
]);

export const uploadTDDFields = multerConfig.fields([
  {
    name: 'docTddFile',
    maxCount: 1
  }
]);

export const uploadLegalKycFields = multerConfig.fields([
  { name: 'file_path_DOF_RP', maxCount: 1 },
  { name: 'file_path_phina', maxCount: 1 },
  { name: 'file_path_acta_eleccion_autoridades', maxCount: 1 },
  { name: 'file_path_identificacion_autoridades', maxCount: 1 },
]);

export const uploadArray = multerConfig.array('files', 10);