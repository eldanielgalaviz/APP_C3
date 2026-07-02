import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { originationContainer } from '../../../../bootstrap/containers/OriginationContainer';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';
import { TransactionApprovalRequest } from '../../domain/Request/OriginationTransactionApprovalRequest';

export class OriginationTransactionApprovalController {
    constructor() {}

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
            const catchUser = AuthMiddleware.userLogged(req)
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
      
}