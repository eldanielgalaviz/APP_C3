import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
} from "class-validator";

export class PrePinAssumptionsRequest {
  // @IsInt({ message: 'p_Id_project debe ser un número entero' })
  // @IsNotEmpty({ message: 'p_Id_project es obligatorio' })
  p_Id_project!: number;

  @IsInt({ message: "p_id_certification_program debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_certification_program es obligatorio" })
  p_id_certification_program!: number;

  @IsInt({ message: "p_id_registration_route debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_registration_route es obligatorio" })
  p_id_registration_route!: number;

  @IsInt({ message: "p_id_methodology debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_methodology es obligatorio" })
  p_id_methodology!: number;

  @IsNotEmpty({ message: "El p_project_area no puede estar en blanco" })
  @IsString()
  @MinLength(1, { message: "El p_project_area debe tener al menos 1 caracter" })
  @MaxLength(250, {
    message: "El p_project_area no puede superar los 250 caracteres",
  })
  p_project_area!: string;

  @IsInt({ message: "p_id_project_condition debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_project_condition es obligatorio" })
  p_id_project_condition!: number;

  @IsInt({ message: "p_id_licences_permits debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_licences_permits es obligatorio" })
  p_id_licences_permits!: number;

  @IsInt({
    message:
      "p_id_confidence_of_crediting_activity_area debe ser un número entero",
  })
  @IsNotEmpty({
    message: "p_id_confidence_of_crediting_activity_area es obligatorio",
  })
  p_id_confidence_of_crediting_activity_area!: number;

  // @IsInt({ message: 'p_id_umafor debe ser un número entero' })
  @IsNotEmpty({ message: "p_id_umafor es obligatorio" })
  p_id_umafor!: number;

  @IsNotEmpty({
    message: "El p_underlying_activities no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_underlying_activities debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_underlying_activities no puede superar los 250 caracteres",
  })
  p_underlying_activities!: string;

  @IsInt({ message: "p_id_estimate_permanence debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_estimate_permanence es obligatorio" })
  p_id_estimate_permanence!: number;

  @IsNotEmpty({ message: "p_estimate_sample_size es obligatorio" })
  @IsString()
  p_estimate_sample_size!: string;

  @IsInt({ message: "p_id_estimate_mrv debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_estimate_mrv es obligatorio" })
  p_id_estimate_mrv!: number;

  @IsInt({ message: "p_id_estimate_leakage debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_estimate_leakage es obligatorio" })
  p_id_estimate_leakage!: number;

  @IsNotEmpty({
    message: "El p_id_estimate_reversal_risk no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_id_estimate_reversal_risk debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message:
      "El p_id_estimate_reversal_risk no puede superar los 250 caracteres",
  })
  p_id_estimate_reversal_risk!: string;


  @IsNotEmpty({
    message: "El p_descriptions no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_descriptions debe tener al menos 1 caracter",
  })
  @MaxLength(500, {
    message:
      "El p_descriptions no puede superar los 500 caracteres",
  })
  p_descriptions!: string;

  @IsNotEmpty({ message: "El p_percentage_mki_price no puede estar en blanco" })
  @IsString()
  @MinLength(1, {
    message: "El p_percentage_mki_price debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_percentage_mki_price no puede superar los 250 caracteres",
  })
  p_percentage_mki_price!: string;

  @IsNotEmpty({
    message: "El p_conficence_upfront_costs no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_conficence_upfront_costs debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message:
      "El p_conficence_upfront_costs no puede superar los 250 caracteres",
  })
  p_conficence_upfront_costs!: string;

  @IsInt({ message: "p_cba debe ser un número entero" })
  @IsNotEmpty({ message: "p_cba es obligatorio" })
  p_cba!: number;

  @IsNotEmpty({ message: "El p_irr no puede estar en blanco" })
  @IsString()
  @MinLength(1, { message: "El p_irr debe tener al menos 1 caracter" })
  @MaxLength(250, { message: "El p_irr no puede superar los 250 caracteres" })
  p_irr!: string;

  @IsNotEmpty({ message: "El p_credit_type no puede estar en blanco" })
  @IsString()
  @MinLength(1, { message: "El p_credit_type debe tener al menos 1 caracter" })
  @MaxLength(250, {
    message: "El p_credit_type no puede superar los 250 caracteres",
  })
  p_credit_type!: string;

  @IsInt({ message: "p_id_safeguards debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_safeguards es obligatorio" })
  p_id_safeguards!: number;

  @IsInt({ message: "p_id_social_community debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_social_community es obligatorio" })
  p_id_social_community!: number;

  @IsInt({ message: "p_id_shareholders debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_shareholders es obligatorio" })
  p_id_shareholders!: number;

  @IsInt({ message: "p_id_press_negative debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_press_negative es obligatorio" })
  p_id_press_negative!: number;

  @IsInt({ message: "p_id_biodiversity debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_biodiversity es obligatorio" })
  p_id_biodiversity!: number;

  @IsInt({ message: "p_id_human_rights debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_human_rights es obligatorio" })
  p_id_human_rights!: number;

  @IsInt({ message: "p_id_indigenous_people debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_indigenous_people es obligatorio" })
  p_id_indigenous_people!: number;

  @IsInt({ message: "p_id_h_s debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_h_s es obligatorio" })
  p_id_h_s!: number;

  @IsInt({ message: "p_id_negative_ehs debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_negative_ehs es obligatorio" })
  p_id_negative_ehs!: number;
}