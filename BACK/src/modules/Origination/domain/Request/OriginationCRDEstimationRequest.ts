import {
  IsNotEmpty,
  IsInt,
} from "class-validator";

export class CDREstimationRequest {
  p_Id_cdr_estimation?: number;

  @IsInt({ message: "p_project_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_project_id es obligatorio" })
  p_project_id!: number;

  @IsInt({ message: "p_ers_calculator_version_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_ers_calculator_version_id es obligatorio" })
  p_ers_calculator_version_id!: number;

  @IsNotEmpty({ message: "p_project_start_date es obligatorio" })
  p_project_start_date!: string;

  p_estimations!: JSON;
}