import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class LegalDueDiligenceRequest {

  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsInt({ message: "p_id_legal_lead debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_legal_lead es obligatorio" })
  p_id_legal_lead!: number;

  @IsInt({ message: "p_id_legal_dd_status debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_legal_dd_status es obligatorio" })
  p_id_legal_dd_status!: number;

  @IsNotEmpty({ message: "p_loi_signed_date es obligatorio" })
  p_loi_signed_date!: string;

  @IsNotEmpty({ message: "p_kyc_completed es obligatorio" })
  @IsString()
  @MaxLength(100, { message: "p_kyc_completed no puede superar los 100 caracteres" })
  p_kyc_completed!: string;

  @IsNotEmpty({ message: "p_cd_requested_to_ran es obligatorio" })
  p_cd_requested_to_ran!: string;

  @IsInt({ message: "p_cb_completed debe ser un número entero" })
  @IsNotEmpty({ message: "p_cb_completed es obligatorio" })
  p_cb_completed!: number;

  @IsNotEmpty({ message: "p_erpa_signed_date es obligatorio" })
  p_erpa_signed_date!: string;

  @IsNotEmpty({ message: "p_buyer es obligatorio" })
  @IsString()
  @MaxLength(100, { message: "p_buyer no puede superar los 100 caracteres" })
  p_buyer!: string;

  @IsNotEmpty({ message: "p_project_aggregator es obligatorio" })
  @IsString()
  @MaxLength(100, { message: "p_project_aggregator no puede superar los 100 caracteres" })
  p_project_aggregator!: string;

  @IsNotEmpty({ message: "p_project_developer es obligatorio" })
  @IsString()
  @MaxLength(100, { message: "p_project_developer no puede superar los 100 caracteres" })
  p_project_developer!: string;

  @IsNotEmpty({ message: "p_project_coordinator es obligatorio" })
  @IsString()
  @MaxLength(100, { message: "p_project_coordinator no puede superar los 100 caracteres" })
  p_project_coordinator!: string;

  @IsNotEmpty({ message: "p_project_coordinator_term_date es obligatorio" })
  p_project_coordinator_term_date!: string;

  @IsNotEmpty({ message: "p_kyc_submission_date es obligatorio" })
  p_kyc_submission_date!: string;

  @IsInt({ message: "p_id_mekyc_status debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_mekyc_status es obligatorio" })
  p_id_mekyc_status!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: "p_kyc no puede superar los 200 caracteres" })
  p_kyc!: string;

  @IsNotEmpty({ message: "p_specific_conditions_prescedent es obligatorio" })
  @IsString()
  @MaxLength(200, { message: "p_specific_conditions_prescedent no puede superar los 200 caracteres" })
  p_specific_conditions_prescedent!: string;

  @IsNotEmpty({ message: "p_notes_legal_team es obligatorio" })
  @IsString()
  @MaxLength(200, { message: "p_notes_legal_team no puede superar los 200 caracteres" })
  p_notes_legal_team!: string;
}