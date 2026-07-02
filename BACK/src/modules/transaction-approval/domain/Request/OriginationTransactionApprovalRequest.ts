import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class TransactionApprovalRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsOptional({ message: "p_Id_project es opcional" })
  p_Id_project!: number;

  @IsOptional({ message: "p_erpa_approval_by_buyer_date es opcional" })
  p_erpa_approval_by_buyer_date!: string;

  @IsOptional({ message: "p_project_approval_date es opcional" })
  p_project_approval_date!: string;

  @IsOptional({ message: "p_project_developer_contract_approved_by_canopia_date es opcional" })
  p_project_developer_contract_approved_by_canopia_date!: string;

  @IsOptional({ message: "p_erpa_approval_by_project_counterpart_date es opcional" })
  p_erpa_approval_by_project_counterpart_date !: string;

  @IsInt({ message: "p_id_approved_buyer debe ser un número entero" })
  @IsOptional({ message: "p_id_approved_buyer es opcional" })
  p_id_approved_buyer!: number;

  @IsInt({ message: "p_percentage_mkt_price debe ser un número entero" })
  @IsOptional({ message: "p_percentage_mkt_price es opcional" })
  p_percentage_mkt_price !: number;

  @IsOptional({ message: "p_project_developer_contract_approved_by_project_counterpart es opcional" })
  p_project_developer_contract_approved_by_project_counterpart!: string;


  @IsOptional({ message: "p_aggregation_approval_by_project_counterpart_date es opcional" })
  p_aggregation_approval_by_project_counterpart_date !: string;

}