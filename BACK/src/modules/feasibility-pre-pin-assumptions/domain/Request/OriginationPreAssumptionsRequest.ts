// OriginationPreAssumptionsRequest.ts

import { IsInt, IsOptional } from "class-validator";

export class PrePinOriginationRequest {
  p_Id_project!: number;

  @IsOptional()
  p_descriptions!: string;

  @IsOptional()
  p_id_certification_program!: number;

  @IsInt()
  @IsOptional()
  p_id_registration_route!: number;

  @IsInt()
  @IsOptional()
  p_id_methodology!: number;

  @IsOptional()
  p_project_area!: string;

  @IsInt()
  @IsOptional()
  p_id_project_condition!: number;

  @IsInt()
  @IsOptional()
  p_id_licences_permits!: number;

  @IsOptional()
  p_id_confidence_of_crediting_activity_area!: number;

  @IsOptional()
  p_id_umafor!: string;

  @IsOptional()
  p_authorizedHarvestingVolume!: string;

  @IsOptional()
  p_underlying_activities!: string;

  @IsInt()
  @IsOptional()
  p_percentage_mki_price!: number;

  @IsOptional()
  p_conficence_upfront_costs!: string;

  @IsInt()
  @IsOptional()
  p_cba!: number;

  @IsOptional()
  p_irr!: string;

  @IsOptional()
  p_credit_type!: string;
}

export class PrePinMrvRequest {
  p_Id_project!: number;

  @IsInt()
  @IsOptional()
  p_id_estimate_permanence!: number;

  @IsOptional()
  p_estimate_sample_size!: string;

  @IsOptional()
  p_id_estimate_mrv!: number;

  @IsOptional()
  p_id_estimate_leakage!: number;

  @IsOptional()
  p_id_estimate_reversal_risk!: string;

  @IsOptional()
  p_Id_buffer_pool!: number;

  @IsOptional()
  p_Id_inventory_stratification!: number;
}

export class PrePinSafeguardsRequest {
  p_Id_project!: number;

  @IsOptional()
  p_id_safeguards!: number;

  @IsOptional()
  p_id_social_community!: number;

  @IsOptional()
  p_id_shareholders!: number;

  @IsOptional()
  p_id_press_negative!: number;

  @IsOptional()
  p_id_biodiversity!: number;

  @IsOptional()
  p_id_human_rights!: number;

  @IsOptional()
  p_id_indigenous_people!: number;

  @IsOptional()
  p_id_h_s!: number;

  @IsOptional()
  p_id_negative_ehs!: number;

  @IsOptional()
  p_Id_grievance_mechanism!: number;
}