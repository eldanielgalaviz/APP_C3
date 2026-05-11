import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { OriginationRequest } from '../../modules/Origination/domain/Request/OriginationRequest';
import { CatchUserLogged } from '../../shared/middleware/CatchUserMiddleware';
import { BlobService } from '../../shared/storage/functionsStorage';
import { PrePinAssumptionsRequest } from '../../modules/Origination/domain/Request/OriginationPreAssumptionsRequest';
import { ProjectAreasRequest } from '../../modules/Origination/domain/Request/OriginationProjectAreasRequest';
import { ActivityAreaRequest } from '../../modules/Origination/domain/Request/OriginationActivityAreasRequest';
import { CDREstimationRequest } from '../../modules/Origination/domain/Request/OriginationCRDEstimationRequest';
import { PedRequest } from '../../modules/Origination/domain/Request/OriginationPEDRequest';
import { LegalDueDiligenceRequest } from '../../modules/Origination/domain/Request/OriginationLegalDueDilicengeRequest';
import { ProjectApprovalRequest } from '../../modules/Origination/domain/Request/OriginationProjectApprovalRequest';
import { TransactionApprovalRequest } from '../../modules/Origination/domain/Request/OriginationTransactionApprovalRequest';
import { legalKYCRequest } from '../../modules/Origination/domain/Request/OriginationLegalKycRequest';
import { ContratingRequest } from '../../modules/Origination/domain/Request/OriginationContratingRequest';
import { CbaImportRequest } from '../../modules/Origination/domain/Request/OriginationCBAImportRequest';
import { TeamAndPlansRequest } from '../../modules/Origination/domain/Request/OriginationTeamAndPlansRequest';
import { originationContainer } from '../../shared/containers/OriginationContainer';


export class OriginationController {
  constructor() {}

   /** Origination - prospect contact */
    async setOrigination(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const origination = plainToInstance(OriginationRequest, req.body);
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

    /** Origination - team and plans */
    async setTeamAndPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(TeamAndPlansRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.teamAndPlans.setTeamAndPlans.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async getTeamAndPlans(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.teamAndPlans.getTeamAndPlans.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - pre-pin assumptions */
    async setPrePinAssumptions(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(PrePinAssumptionsRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.prePinAssumptions.setPrePinAssumptions.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async getPrePinAssumptions(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.prePinAssumptions.getPrePinAssumptions.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - project areas */
    async setProjectAreas(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();

            const catchUser = CatchUserLogged.userLogged(req)

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

    /** Origination - activity area */
    async getActivityArea(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.ActivityArea.getActivityArea.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setActivityArea(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(ActivityAreaRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.ActivityArea.setActivityArea.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - CDR estimation */
    async getCDREstimation(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.CDREstimation.getCDREstimation.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setCDREstimation(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(CDREstimationRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.CDREstimation.setCDREstimation.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - PED */
    async getPed(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.ped.getPed.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }


    async setPed(req: Request, res: Response, next: NextFunction) {
        try {
            const blobService = new BlobService();
            let data = JSON.parse(req.body.data)
            
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const docPed = files?.docPedFile?.[0];

            let docPedUrl = {
                blobName: '',
                url: ''
            };

            const blobpath = {
                project_id: data.p_projects_id,
                macro: 'origination',
                module: 'feasibility'
            }

            if (docPed) {
                if(data.p_pedaa_link != ''){
                    docPedUrl = await blobService.replaceFiles(docPed, data.p_pedaa_link);
                } else {
                    docPedUrl = await blobService.uploadFiles(docPed, blobpath);
                }
            }

            data.p_pedaa_link = docPedUrl.blobName

            let finalData = plainToInstance(PedRequest, data);
            
            const catchUser = CatchUserLogged.userLogged(req)

            const errors = await validate(finalData);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.ped.setPed.run(finalData, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - Legal Due Diligence */
    async getLegalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.LegalDueDiligence.getLegalDueDiligence.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setLegalDueDiligence(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(LegalDueDiligenceRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.LegalDueDiligence.setLegalDueDiligence.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    /** Origination - Project Approval */
    async getProjectApproval(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.ProjectApproval.getProjectApproval.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setProjectApproval(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(ProjectApprovalRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.ProjectApproval.setProjectApproval.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }        
    
    /** Origination - Transaction Approval */
    async getTransactionApproval(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.TransactionApproval.getTransactionApproval.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setTransactionApproval(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(TransactionApprovalRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.TransactionApproval.setTransactionApproval.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

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
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(legalKYCRequest, req.body);
            const errors = await validate(data);

            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.LegalKYC.setLegalKYC.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }   
          
    /** Origination - Contrating */
    async getContrating(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.Contrating.getContrating.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async setContrating(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(ContratingRequest, req.body);
            const errors = await validate(data);   
            
            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.Contrating.setContrating.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
        
    /** Origination - CBA imports */

    async setCbaImport(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = CatchUserLogged.userLogged(req)
            const data = plainToInstance(CbaImportRequest, req.body);
            const errors = await validate(data);   
            
            if (errors.length > 0) {
            return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }

            const result = await originationContainer.CbaImport.setCbaImport.run(data, catchUser);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }

    async getCbaImport(req: Request, res: Response, next: NextFunction) {
        try {
            const idProject = Number(req.params.id);
            const result = await originationContainer.CbaImport.getCbaImport.run(idProject);
            return res.status(200).json({ valido: 1, result });
        } catch (error) {
            next(error);
        }
    }
}