import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsInt,
  IsNumber,
} from "class-validator";

export class ProjectAreasRequest {
  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsInt({ message: "p_id_certification debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_certification es obligatorio" })
  p_id_certification!: number;

  @IsNumber({}, { message: "p_total_area debe ser un número" })
  @IsNotEmpty({ message: "p_total_area es obligatorio" })
  p_total_area!: number;

  @IsNumber({}, { message: "p_achurado debe ser un número" })
  @IsNotEmpty({ message: "p_achurado es obligatorio" })
  p_achurado!: number;

  @IsNumber({}, { message: "p_expropriated_area debe ser un número" })
  @IsNotEmpty({ message: "p_expropriated_area es obligatorio" })
  p_expropriated_area!: number;

  @IsOptional()
  p_file_path_phina!: string;

  @IsNumber({}, { message: "p_total_perimeter_area_ran debe ser un número" })
  @IsNotEmpty({ message: "p_total_perimeter_area_ran es obligatorio" })
  p_total_perimeter_area_ran!: number;

  @IsInt({ message: "p_ran_application debe ser un número entero" })
  @IsNotEmpty({ message: "p_ran_application es obligatorio" })
  p_ran_application!: number;

  @IsNumber({}, { message: "p_internal_flat_surface debe ser un número" })
  @IsOptional({ message: "p_internal_flat_surface es opcional" })
  p_internal_flat_surface!: number;

  @IsNumber({}, { message: "p_expropriated_areas debe ser un número" })
  @IsOptional({ message: "p_expropriated_areas es opcional" })
  p_expropriated_areas!: number;

  @IsInt({ message: "p_plan_yaer debe ser un número entero" })
  @IsOptional({ message: "p_plan_yaer es opcional" })
  p_plan_yaer!: number;

  @IsOptional()
  p_file_path_internal_flat!: string;

  @IsInt({ message: "p_id_ap_por_sig debe ser un número entero" })
  @IsOptional({ message: "p_id_ap_por_sig es opcional" })
  p_id_ap_por_sig!: number;

  @IsOptional()
  p_file_path_ap!: string;

  @IsOptional({ message: "El p_observations_ap es opcional" })
  @IsString()
  p_observations_ap!: string;
}