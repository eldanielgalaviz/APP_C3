import { IsOptional, IsInt } from "class-validator";

export class PedOriginationRequest {
  @IsOptional()
  p_id_ped_origination?: number;

  @IsInt({ message: "p_projects_id debe ser un número entero" })
  p_projects_id!: number;

  @IsOptional()
  p_ped_ap_result_id?: number;

  @IsOptional()
  p_can_include_anp_or_advc?: number;

  @IsOptional()
  p_can_include_psa?: number;

  @IsOptional()
  p_requires_commercial_agriculture?: number;

  @IsOptional()
  p_requires_subsidies?: number;
}

export class PedSigRequest {
  @IsOptional()
  p_id_ped_sig?: number;

  @IsInt({ message: "p_projects_id debe ser un número entero" })
  p_projects_id!: number;

  @IsOptional()
  p_pedaa_section_id?: number;

  @IsOptional()
  p_aa_population_id?: number;

  @IsOptional()
  p_agricultural_activity_id?: number;

  @IsOptional()
  p_survey_id?: number;

  @IsOptional()
  p_aa_subsidy_id?: number;

  @IsOptional()
  p_aa_steep_id?: number;

  @IsOptional()
  p_aa_coverage_change_id?: number;

  @IsOptional()
  p_pedaa_result_id?: number;

  @IsOptional()
  p_pedaa_link?: string;

  @IsOptional()
  p_pedaa_observations?: string;
}