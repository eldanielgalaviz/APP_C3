import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class SmeByPlanTeamRequest {

    @IsInt({ message: "p_id_smes_rel_plan_team debe ser un número entero" })
    @IsNotEmpty({ message: "p_id_smes_rel_plan_team es obligatorio" })
    p_id_smes_rel_plan_team!: number;

    @IsInt({ message: "p_plan_team_id debe ser un número entero" })
    @IsNotEmpty({ message: "p_plan_team_id es obligatorio" })
    p_plan_team_id!: number;

    @IsInt({ message: "p_id_sme debe ser un número entero" })
    @IsNotEmpty({ message: "p_id_sme es obligatorio" })
    p_id_sme!: number;

    @IsInt({ message: "p_status debe ser un número entero" })
    @IsNotEmpty({ message: "p_status es obligatorio" })
    p_status!: number;
}