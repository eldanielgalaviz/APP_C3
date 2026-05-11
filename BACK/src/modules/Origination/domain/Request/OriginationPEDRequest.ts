import {
  IsNotEmpty,
  IsOptional,
  IsInt,
} from "class-validator";

export class PedRequest {
  p_id_ped?: number;

  @IsInt({ message: "p_projects_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_projects_id es obligatorio" })
  p_projects_id!: number;

  @IsInt({ message: "p_ped_ap_result_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_ped_ap_result_id es obligatorio" })
  p_ped_ap_result_id!: number;

  @IsInt({ message: "p_can_include_anp_or_advc debe ser un número entero" })
  @IsNotEmpty({ message: "p_can_include_anp_or_advc es obligatorio" })
  p_can_include_anp_or_advc!: number;

  @IsInt({ message: "p_can_include_psa debe ser un número entero" })
  @IsNotEmpty({ message: "p_can_include_psa es obligatorio" })
  p_can_include_psa!: number;

  @IsInt({
    message: "p_requires_commercial_agriculture debe ser un número entero",
  })
  @IsNotEmpty({ message: "p_requires_commercial_agriculture es obligatorio" })
  p_requires_commercial_agriculture!: number;

  @IsInt({ message: "p_requires_subsidies debe ser un número entero" })
  @IsNotEmpty({ message: "p_requires_subsidies es obligatorio" })
  p_requires_subsidies!: number;

  @IsInt({ message: "p_pedaa_section_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_pedaa_section_id es obligatorio" })
  p_pedaa_section_id!: number;

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

  @IsInt({ message: "p_aa_coverage_change_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_aa_coverage_change_id es obligatorio" })
  p_aa_coverage_change_id!: number;

  @IsInt({ message: "p_pedaa_result_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_pedaa_result_id es obligatorio" })
  p_pedaa_result_id!: number;

  @IsOptional()
  p_pedaa_link!: string;
  
  @IsNotEmpty({ message: "p_pedaa_observations es obligatorio" })
  p_pedaa_observations!: string;
  
}