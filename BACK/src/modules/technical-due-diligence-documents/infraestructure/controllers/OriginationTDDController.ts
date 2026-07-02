import { NextFunction, Request, Response } from 'express';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BlobService } from '../../../../shared/storage/functionsStorage';
import { TechnicalDueDiligenceRequest } from '../../domain/Request/OriginationTDDdocumentRequest';

export class OriginationTDDController {
  constructor() {}

   async getTechnicalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.technicalDueDiligence.getTechnicalDueDiligence.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setTechnicalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();
            const catchUser = AuthMiddleware.userLogged(req)    
            const tddDocument = plainToInstance(TechnicalDueDiligenceRequest, JSON.parse(req.body.data));
            const errors = await validate(tddDocument);

            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
            
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            if (!files && !tddDocument.p_id_tdd_documents) {
                return res.status(400).json({ valido: 0, message: 'File is required' });
            }

            const docTdd = files?.docTddFile?.[0];

            let docTddUrl = {
                blobName: '',
                url: ''
            };

            const blobpath = {
                project_id: tddDocument.p_projects_id,
                macro: 'origination',
                module: 'tdd'
            }
            
            if (docTdd){
                if(tddDocument.p_document_url != ''){
                    docTddUrl = await blobService.replaceFiles(docTdd, tddDocument.p_document_url);
                } else {
                    docTddUrl = await blobService.uploadFiles(docTdd, blobpath);
                }
            }

            tddDocument.p_document_url = docTdd ? docTddUrl.blobName : tddDocument.p_document_url;

            const result = await originationContainer.technicalDueDiligence.setTechnicalDueDiligence.run(tddDocument, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}