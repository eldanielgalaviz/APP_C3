import {
  IsNotEmpty,
  IsInt,
  IsOptional
} from "class-validator";

export class ProjectApprovalRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsOptional({ message: "p_dd_pack_to_mercuria_submission_date es opcional" })
  p_dd_pack_to_mercuria_submission_date!: string;

  @IsOptional({ message: "p_informal_assembly_to_present_project_done_date es opcional" })
  p_informal_assembly_to_present_project_done_date!: string;

  @IsOptional({ message: "p_mercuria_questions_answered_date es opcional" })
  p_mercuria_questions_answered_date!: string;


  @IsOptional({ message: "p_dd_pack_approved_by_mercuria_date es opcional" })
  p_dd_pack_approved_by_mercuria_date !: string;

}