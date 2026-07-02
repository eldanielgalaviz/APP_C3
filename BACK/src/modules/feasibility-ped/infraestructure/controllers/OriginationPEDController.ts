import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { PedOriginationRequest, PedSigRequest } from '../../domain/Request/OriginationPEDRequest';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { BlobService } from '../../../../shared/storage/functionsStorage';

export class OriginationPEDController {
  constructor() {}

    async getPed(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.ped.getPed.run(idProject);
            return res.status(200).json({ valido: 1, result });
            } catch (error) {
        next(error);
        }
    }

    async setPedOrigination(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req);
            const data = plainToInstance(PedOriginationRequest, req.body);
            const errors = await validate(data);
            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
            const result = await originationContainer.ped.setPedOrigination.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setPedSig(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();
            let data = JSON.parse(req.body.data);

            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const docPed = files?.docPedFile?.[0];

            let docPedUrl = { blobName: '', url: '' };

            const blobpath = {
                project_id: data.p_projects_id,
                macro: 'origination',
                module: 'feasibility'
            };

            if (docPed) {
                if (data.p_pedaa_link && data.p_pedaa_link !== '') {
                docPedUrl = await blobService.replaceFiles(docPed, data.p_pedaa_link);
                } else {
                docPedUrl = await blobService.uploadFiles(docPed, blobpath);
                }
                data.p_pedaa_link = docPedUrl.blobName;
            }

            const catchUser = AuthMiddleware.userLogged(req);
            const finalData = plainToInstance(PedSigRequest, data);
            const errors = await validate(finalData);

            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.ped.setPedSig.run(finalData, catchUser);
            return res.status(200).json({ valido: 1, result });
            } catch (error) {
            next(error);
        }
    }
}