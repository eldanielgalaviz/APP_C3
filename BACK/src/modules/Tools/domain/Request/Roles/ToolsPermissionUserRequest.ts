import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
} from "class-validator";

export class ToolsPermissionUserRequest {

  @IsInt({ message: "p_Idpermissionuser debe ser un número entero" })
  @IsNotEmpty({ message: "p_Idpermissionuser es obligatorio" })
  p_Idpermissionuser!: number;

  @IsString({ message: "p_short_permission_desc debe ser un string" })
  @IsNotEmpty({ message: "p_short_permission_desc es obligatorio" })
  @MinLength(3, { message: "p_short_permission_desc debe tener al menos 3 caracteres" })
  @MaxLength(100, { message: "p_short_permission_desc no puede superar los 100 caracteres" })
  p_short_permission_desc!: string;

  @IsOptional()
  @IsString({ message: "p_long_permission_desc debe ser un string" })
  @MaxLength(500, { message: "p_long_permission_desc no puede superar los 500 caracteres" })
  p_long_permission_desc?: string | null;

  @IsInt({ message: "p_Idstatus debe ser un número entero" })
  @IsNotEmpty({ message: "p_Idstatus es obligatorio" })
  p_Idstatus!: number;
}