import {
  IsNotEmpty,
  IsInt,
} from "class-validator";
import { SmeByPlanTeamRequest } from "./ImplementationSmeByPlanTeamRequest";

export class PlanTeamRequest {

    p_id_plan_team?: number;
    
    @IsInt({ message: "p_projects_id debe ser un número entero" })
    @IsNotEmpty({ message: "p_projects_id es obligatorio" })
    p_projects_id!: number;

    @IsInt({ message: "p_project_manager_id debe ser un número entero" })
    @IsNotEmpty({ message: "p_project_manager_id es obligatorio" })
    p_project_manager_id!: number;

    @IsNotEmpty({ message: "p_document_preparation_date es obligatorio" })
    p_document_preparation_date!: Date;

    @IsNotEmpty({ message: "p_presentation_assembly_date es obligatorio" })
    p_presentation_assembly_date!: Date;

    @IsInt({ message: "p_project_log_id debe ser un número entero" })
    @IsNotEmpty({ message: "p_project_log_id es obligatorio" })
    p_project_log_id!: number;

    @IsInt({ message: "p_project_log_id debe ser un número entero" })
    @IsNotEmpty({ message: "p_project_log_id es obligatorio" })
    p_implementation_partner_id!: number;

    @IsInt({ message: "p_status_project debe ser un número entero" })
    @IsNotEmpty({ message: "p_status_project es obligatorio" })
    p_status_project!: number

    smes?: SmeByPlanTeamRequest[];
}