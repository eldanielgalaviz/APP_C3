import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsNumber,
} from "class-validator";

export class ActivityAreaRequest {
  p_id_project!: number;


  @IsNumber({}, { message: "p_activity_area debe ser un número" })
  @IsNotEmpty({ message: "p_activity_area es obligatorio" })
  p_activity_area!: number;

  @IsInt({ message: "p_status_validation_aa_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_status_validation_aa_id es obligatorio" })
  p_status_validation_aa_id!: number;

  @IsInt({ message: "p_version_aa_id debe ser un número entero" })
  @IsNotEmpty({ message: "p_version_aa_id es obligatorio" })
  p_version_aa_id!: number;

  @IsNotEmpty({ message: "El p_observations_aa no puede estar en blanco" })
  @IsString()
  @MinLength(1, {
    message: "El p_observations_aa debe tener al menos 1 caracter",
  })
  @MaxLength(250, {
    message: "El p_observations_aa no puede superar los 250 caracteres",
  })
  p_observations_aa!: string;
}
