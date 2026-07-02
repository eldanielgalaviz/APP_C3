import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { legalKYCRequest } from '../../domain/Request/OriginationLegalKycRequest';
import { BlobService } from '../../../../shared/storage/functionsStorage';

export class OriginationLegalKycController {
  constructor() {}

    /** Origination - Legal KYC */
    async getLegalKYC(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.LegalKYC.getLegalKYC.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
    
    async setLegalKYC(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();

            const catchUser = AuthMiddleware.userLogged(req)

            let data = JSON.parse(req.body.data)

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const docDofRp = files?.file_path_DOF_RP?.[0];
            const docPhina = files?.file_path_phina?.[0];
            const docActaEleccion = files?.file_path_acta_eleccion_autoridades?.[0];
            const docIdentificacion = files?.file_path_identificacion_autoridades?.[0];

            let docDofRpUrl = {
                blobName: '',
                url: ''
            };
            let docPhinaUrl = {
                blobName: '',
                url: ''
            };
            let docActaEleccionUrl = {
                blobName: '',
                url: ''
            };
            let docIdentificacionUrl = {
                blobName: '',
                url: ''
            };

            const blobpath = {
                project_id: data.p_Id_project,
                macro: 'origination',
                module: 'legalKyc'
            }

            if (docDofRp) {
                if (data.p_file_path_DOF_RP && data.p_file_path_DOF_RP !== '') {
                    docDofRpUrl = await blobService.replaceFiles(docDofRp, data.p_file_path_DOF_RP);
                } else {
                    docDofRpUrl = await blobService.uploadFiles(docDofRp, blobpath);
                }
            }

            if (docPhina) {
                if (data.p_file_path_phina && data.p_file_path_phina !== '') {
                    docPhinaUrl = await blobService.replaceFiles(docPhina, data.p_file_path_phina);
                } else {
                    docPhinaUrl = await blobService.uploadFiles(docPhina, blobpath);
                }
            }

            if (docActaEleccion) {
                if (data.p_file_path_acta_eleccion_autoridades && data.p_file_path_acta_eleccion_autoridades !== '') {
                    docActaEleccionUrl = await blobService.replaceFiles(docActaEleccion, data.p_file_path_acta_eleccion_autoridades);
                } else {
                    docActaEleccionUrl = await blobService.uploadFiles(docActaEleccion, blobpath);
                }
            }

            if (docIdentificacion) {
                if (data.p_file_path_identificacion_autoridades && data.p_file_path_identificacion_autoridades !== '') {
                    docIdentificacionUrl = await blobService.replaceFiles(docIdentificacion, data.p_file_path_identificacion_autoridades);
                } else {
                    docIdentificacionUrl = await blobService.uploadFiles(docIdentificacion, blobpath);
                }
            }

            if (docDofRp) data.p_file_path_DOF_RP = docDofRpUrl.blobName;
            if (docPhina) data.p_file_path_phina = docPhinaUrl.blobName;
            if (docActaEleccion) data.p_file_path_acta_eleccion_autoridades = docActaEleccionUrl.blobName;
            if (docIdentificacion) data.p_file_path_identificacion_autoridades = docIdentificacionUrl.blobName;

            let finalData = plainToInstance(legalKYCRequest, data);
            const errors = await validate(finalData);

            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.LegalKYC.setLegalKYC.run(finalData, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }  

}