import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { implementationContainer } from '../../../../bootstrap/containers/ImplementationContainer';
import { PlanTeamRequest } from '../../domain/Request/PlanAndTeam/ImplementationPlanTeamRequest';
import { SmeByPlanTeamRequest } from '../../domain/Request/PlanAndTeam/ImplementationSmeByPlanTeamRequest';
import { AuthMiddleware } from '../../../../shared/middleware/AuthMiddleware';

export class ImplementationPlanTeamController {

    /** Plan and team */
    async setPlanTeam(req: Request, res: Response, next: NextFunction) {
        try {
            const catchUser = AuthMiddleware.userLogged(req)
            const origination = plainToInstance(PlanTeamRequest, req.body);
            const smes = req.body.smes;
            delete origination?.smes;
            const errors = await validate(origination);
            
            if (errors.length > 0) {
                return res.status(400).json({ valido: 0, errors: errors[0].constraints });
            }
        
            const setPlanTeam = await implementationContainer.planTeam.setPlanTeam.run(origination, catchUser);
            if(setPlanTeam[0].valid_result === 1){
                for(const sme of smes){
                    const smeData: SmeByPlanTeamRequest = {
                        p_id_smes_rel_plan_team: sme.p_id_smes_rel_plan_team,
                        p_plan_team_id: setPlanTeam[0].id_plan_team || 0,
                        p_id_sme: sme.p_id_sme,
                        p_status: sme.p_status,
                    }
                    await implementationContainer.planTeam.setSmeByPlanTeam.run(smeData);
                }
            }
            return res.status(200).json({ valido: 1, result: setPlanTeam});
        } catch (error) {
            next(error);
        }
    }

    async getPlanTeam(req: Request, res: Response, next: NextFunction){
        try {
            const idproject = Number(req.params.id);
            const getPlanTeam = await implementationContainer.planTeam.getPlanTeam.run(idproject);
            return res.status(200).json({valido: 1, result: getPlanTeam});
        } catch (error) {
            next(error)
        }
    }

    async getSmeByPlanTeam(req: Request, res: Response, next: NextFunction){
        try {
            const planTeamId = Number(req.params.id);
            const getSmeByPlanTeam = await implementationContainer.planTeam.getSmeByPlanTeam.run(planTeamId);
            return res.status(200).json({valido: 1, result: getSmeByPlanTeam});
        } catch (error) {
            next(error)
        }
    }
}