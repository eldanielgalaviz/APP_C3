import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BlobService } from '../../../../shared/storage/functionsStorage';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { ProjectAreasRequest } from '../../domain/Request/OriginationProjectAreasRequest';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';

export class OriginationProjectAreaController {
  constructor() {}

  /** Origination - project areas */
    async setProjectAreas(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();

            const catchUser = AuthMiddleware.userLogged(req)

            let data = JSON.parse(req.body.data)

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            
            const docPhina = files?.docPhina?.[0];
            const docInterFlat = files?.docInterFlat?.[0];
            const DocAP = files?.DocAP?.[0];

            let docPhinaUrl = {
                blobName: '',
                url: ''
            };
            let docInterFlatUrl = {
                blobName: '',
                url: ''
            };
            let docAPUrl = {
                blobName: '',
                url: ''
            };

            const blobpath = {
                project_id: data.p_Id_project,
                macro: 'origination',
                module: 'feasibility'
            }

            if (docPhina) {
                if(data.p_file_path_phina != ''){
                    docPhinaUrl = await blobService.replaceFiles(docPhina, data.p_file_path_phina);
                } else {
                    docPhinaUrl = await blobService.uploadFiles(docPhina, blobpath);
                }
            }

            if (docInterFlat) {
                if(data.p_file_path_internal_flat != ''){
                    docInterFlatUrl = await blobService.replaceFiles(docInterFlat, data.p_file_path_internal_flat);
                } else {
                    docInterFlatUrl = await blobService.uploadFiles(docInterFlat, blobpath);
                }
            }

            if (DocAP) {
                if(data.p_file_path_ap != ''){
                    docAPUrl = await blobService.replaceFiles(DocAP, data.p_file_path_ap);
                } else {
                    docAPUrl = await blobService.uploadFiles(DocAP, blobpath);
                }
            }

            data.p_file_path_phina = docPhinaUrl.blobName
            data.p_file_path_internal_flat = docInterFlatUrl.blobName
            data.p_file_path_ap = docAPUrl.blobName

            let finalData = plainToInstance(ProjectAreasRequest, data);
            const errors = await validate(finalData);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.projectAreas.setProjectAreas.run(finalData, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
    }
    }

    async getProjectAreas(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.projectAreas.getProjectAreas.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
    
}