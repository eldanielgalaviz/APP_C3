import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
} from "class-validator";

export class ProjectAreasRequest {
  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsInt({ message: "p_id_certification debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_certification es obligatorio" })
  p_id_certification!: number;

  @IsNotEmpty({ message: "El p_total_area no puede estar en blanco" })
  @IsString()
  @MinLength(1, { message: "El p_total_area debe tener al menos 1 caracter" })
  @MaxLength(250, {
    message: "El p_total_area no puede superar los 250 caracteres",
  })
  p_total_area!: string;

  @IsNotEmpty({ message: "El p_achurado no puede estar en blanco" })
  @IsString()
  @MinLength(1, { message: "El p_achurado debe tener al menos 1 caracter" })
  @MaxLength(250, {
    message: "El p_achurado no puede superar los 250 caracteres",
  })
  p_achurado!: string;

  @IsNotEmpty({ message: "El p_expropriated_area no puede estar en blanco" })
  @IsString()
  @MinLength(1, {
    message: "El p_expropriated_area debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_expropriated_area no puede superar los 250 caracteres",
  })
  p_expropriated_area!: string;

  @IsOptional()
  p_file_path_phina!: string;

  @IsNotEmpty({
    message: "El p_total_perimeter_area_ran no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_total_perimeter_area_ran debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message:
      "El p_total_perimeter_area_ran no puede superar los 250 caracteres",
  })
  p_total_perimeter_area_ran!: string;

  @IsInt({ message: "p_ran_application debe ser un número entero" })
  @IsNotEmpty({ message: "p_ran_application es obligatorio" })
  p_ran_application!: number;

  @IsNotEmpty({
    message: "El p_internal_flat_surface no puede estar en blanco",
  })
  @IsString()
  @MinLength(1, {
    message: "El p_internal_flat_surface debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_internal_flat_surface no puede superar los 250 caracteres",
  })
  p_internal_flat_surface!: string;

  @IsNotEmpty({ message: "El p_expropriated_areas no puede estar en blanco" })
  @IsString()
  @MinLength(1, {
    message: "El p_expropriated_areas debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_expropriated_areas no puede superar los 250 caracteres",
  })
  p_expropriated_areas!: string;

  @IsInt({ message: "p_plan_yaer debe ser un número entero" })
  @IsNotEmpty({ message: "p_plan_yaer es obligatorio" })
  p_plan_yaer!: number;

  @IsOptional()
  p_file_path_internal_flat!: string;

  @IsInt({ message: "p_id_ap_por_sig debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_ap_por_sig es obligatorio" })
  p_id_ap_por_sig!: string;

  @IsOptional()
  p_file_path_ap!: string;

  @IsNotEmpty({ message: "El p_observations_ap no puede estar en blanco" })
  @IsString()
  @MinLength(1, {
    message: "El p_observations_ap debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_observations_ap no puede superar los 250 caracteres",
  })
  p_observations_ap!: string;
}