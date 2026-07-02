import {
  IsNotEmpty,
  IsInt,
  IsOptional
} from "class-validator";

export class ContratingRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsOptional({ message: "p_erpa_signed_by_buyer es IsOptional" })
  p_erpa_signed_by_buyer!: string;

  @IsOptional({ message: "p_erpa_signed_by_project_counterpart es IsOptional" })
  p_erpa_signed_by_project_counterpart!: string;

  @IsOptional({ message: "p_project_developer_contract_signed_by_project_counterpart es IsOptional" })
  p_project_developer_contract_signed_by_project_counterpart!: string;

  @IsOptional({ message: "p_aggregation_approval_signed_by_project_counterpart es IsOptional" })
  p_aggregation_approval_signed_by_project_counterpart!: string;

  @IsOptional({ message: "p_authority_designation_format_signed es IsOptional" })
  p_authority_designation_format_signed!: string;

  @IsOptional({ message: "p_terms_of_use_signed_project_counterpart es IsOptional" })
  p_terms_of_use_signed_project_counterpart!: string;

  @IsOptional({ message: "p_project_developer_contract_signed_by_canopia es IsOptional" })
  p_project_developer_contract_signed_by_canopia!: string;
}