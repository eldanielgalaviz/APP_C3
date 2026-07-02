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

  @IsOptional({ message: "p_loi_signed_date es IsOptional" })
  p_loi_signed_date!: string;

  @IsOptional({ message: "p_cd_requested_to_ran es IsOptional" })
  p_cd_requested_to_ran!: string;

  @IsInt({ message: "p_cb_completed debe ser un número entero" })
  @IsOptional({ message: "p_cb_completed es IsOptional" })
  p_cb_completed!: number;

  @IsOptional({ message: "p_erpa_signed_date es IsOptional" })
  p_erpa_signed_date!: string;

  @IsOptional({ message: "p_buyer es IsOptional" })
  @IsString()
  @MaxLength(100, { message: "p_buyer no puede superar los 100 caracteres" })
  p_buyer!: string;

  @IsOptional({ message: "p_project_aggregator es IsOptional" })
  @IsString()
  @MaxLength(100, { message: "p_project_aggregator no puede superar los 100 caracteres" })
  p_project_aggregator!: string;

  @IsOptional({ message: "p_project_developer es IsOptional" })
  @IsString()
  @MaxLength(100, { message: "p_project_developer no puede superar los 100 caracteres" })
  p_project_developer!: string;

  @IsOptional({ message: "p_project_coordinator es IsOptional" })
  @IsString()
  @MaxLength(100, { message: "p_project_coordinator no puede superar los 100 caracteres" })
  p_project_coordinator!: string;

  @IsOptional({ message: "p_project_coordinator_term_date es IsOptional" })
  p_project_coordinator_term_date!: string;

  @IsOptional({ message: "p_specific_conditions_prescedent es IsOptional" })
  @IsString()
  @MaxLength(200, { message: "p_specific_conditions_prescedent no puede superar los 200 caracteres" })
  p_specific_conditions_prescedent!: string;

  @IsOptional({ message: "p_notes_legal_team es IsOptional" })
  @IsString()
  @MaxLength(200, { message: "p_notes_legal_team no puede superar los 200 caracteres" })
  p_notes_legal_team!: string;
}