import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { OriginationRequest } from '../../domain/Request/OriginationRequest';
import { BlobService } from '../../../../shared/storage/functionsStorage';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
 
export class OriginationController {
  constructor() {}

   /** Origination - prospect contact */
    async setOrigination(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const blobService = new BlobService();

            let data = JSON.parse(req.body.data)

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };
            
            const docPolygon = files?.docPolygon?.[0];

            let docPolygonUrl = {
                blobName: '',
                url: ''
            };

            const blobpath = {
                project_id: data.project_name,
                macro: 'origination',
                module: 'prospect',
            }

            if (docPolygon) {
                if(data.link_property_polygon != ''){
                    docPolygonUrl = await blobService.replaceFiles(docPolygon, data.link_property_polygon);
                } else {
                    docPolygonUrl = await blobService.uploadFiles(docPolygon, blobpath);
                }
            }

            if (docPolygon) data.link_property_polygon = docPolygonUrl.blobName;

            const origination = plainToInstance(OriginationRequest, data);
            const errors = await validate(origination);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setOrigination = await originationContainer.setOrigination.run(origination, catchUser);
            return res.status(200).json({ valido: 1, result: setOrigination});
        } catch (error) {
            next(error);
        }
    }

    async getOrigination(req: Request, res: Response, next: NextFunction){
        try {
            const idorigination = Number(req.params.id);
            const getOrigination = await originationContainer.getOrigination.run(idorigination);
            return res.status(200).json({valido: 1, result: getOrigination});
        } catch (error) {
            next(error)
        }
    } 

    /** Function to see files by Blob storage */
    async getFileWithPath(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();

            const { filePath } = req.body

            const { stream, contentType } = await blobService.getFileStream(filePath);

            res.setHeader('Content-Type', contentType || 'application/octet-stream');

            stream?.pipe(res);

        } catch (error) {
            next(error);
        }
    }

    /** All projects */
    getProjects = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await originationContainer.projects.getProjects.run();
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

 


    

    async getOverview(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.Overview.getOverview.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}