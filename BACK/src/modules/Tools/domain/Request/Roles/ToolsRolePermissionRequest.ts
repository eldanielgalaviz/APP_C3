import {
  IsNotEmpty,
  IsInt,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

export class ToolsRolePermissionRequest {
    
    @IsInt({ message: 'p_Iduser debe ser un número entero' })
    @IsNotEmpty({ message: "p_Iduser es obligatorio" })
    p_Idrole!: number;

    @IsString({ message: 'p_short_role_desc debe ser un string' })
    @IsNotEmpty({ message: "p_short_role_desc es obligatorio" })
    @MinLength(3, { message: "El p_short_role_desc debe tener al menos 3 caracteres",})
    @MaxLength(100, { message: "El p_short_role_desc no puede superar los 100 caracteres",})
    p_short_role_desc!: string;
    
    @IsInt({ message: 'p_Idstatus debe ser un número entero' })
    @IsNotEmpty({ message: "p_Idstatus es obligatorio" })
    isDeleted!: number;

    @IsString({ message: 'p_Idstatus debe ser un string' })
    @IsNotEmpty({ message: "p_Idstatus es obligatorio" })
    p_permissions!: number
}
