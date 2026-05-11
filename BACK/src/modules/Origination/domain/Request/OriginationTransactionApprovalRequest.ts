import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
} from "class-validator";

export class TransactionApprovalRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsNotEmpty({ message: "p_erpa_approval_by_buyer_date es obligatorio" })
  p_erpa_approval_by_buyer_date!: string;

  @IsNotEmpty({ message: "p_project_approval_date es obligatorio" })
  p_project_approval_date!: string;

  @IsNotEmpty({ message: "p_project_developer_contract_approved_by_canopia_date es obligatorio" })
  p_project_developer_contract_approved_by_canopia_date!: string;

  @IsNotEmpty({ message: "p_erpa_approval_by_project_counterpart_date es obligatorio" })
  p_erpa_approval_by_project_counterpart_date !: string;

  @IsInt({ message: "p_id_approved_buyer debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_approved_buyer es obligatorio" })
  p_id_approved_buyer!: number;

  @IsNotEmpty({ message: "p_percentage_mkt_price es obligatorio" })
  @IsString()
  @MaxLength(200, { message: "p_percentage_mkt_price no puede superar los 200 caracteres" })
  p_percentage_mkt_price !: string;

  @IsNotEmpty({ message: "p_project_developer_contract_approved_by_project_counterpart es obligatorio" })
  p_project_developer_contract_approved_by_project_counterpart!: string;


  @IsNotEmpty({ message: "p_aggregation_approval_by_project_counterpart_date es obligatorio" })
  p_aggregation_approval_by_project_counterpart_date !: string;

}