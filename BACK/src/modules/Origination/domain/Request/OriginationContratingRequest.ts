import {
  IsNotEmpty,
  IsInt,
} from "class-validator";

export class ContratingRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsNotEmpty({ message: "p_erpa_signed_by_buyer es obligatorio" })
  p_erpa_signed_by_buyer!: string;

  @IsNotEmpty({ message: "p_erpa_signed_by_project_counterpart es obligatorio" })
  p_erpa_signed_by_project_counterpart!: string;

  @IsNotEmpty({ message: "p_project_developer_contract_signed_by_project_counterpart es obligatorio" })
  p_project_developer_contract_signed_by_project_counterpart!: string;

  @IsNotEmpty({ message: "p_aggregation_approval_signed_by_project_counterpart es obligatorio" })
  p_aggregation_approval_signed_by_project_counterpart!: string;

  @IsNotEmpty({ message: "p_authority_designation_format_signed es obligatorio" })
  p_authority_designation_format_signed!: string;

  @IsNotEmpty({ message: "p_terms_of_use_signed_project_counterpart es obligatorio" })
  p_terms_of_use_signed_project_counterpart!: string;

  @IsNotEmpty({ message: "p_project_developer_contract_signed_by_canopia es obligatorio" })
  p_project_developer_contract_signed_by_canopia!: string;
}