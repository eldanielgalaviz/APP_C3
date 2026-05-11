import {
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class ToolsRoleRequest {
    
    p_Idrole?: number;

    @IsNotEmpty({ message: "p_short_main_desc es obligatorio" })
    @MinLength(3, { message: "El p_short_main_desc debe tener al menos 3 caracteres",})
    @MaxLength(100, { message: "El p_short_main_desc no puede superar los 250 caracteres",})
    p_short_role_desc!: string;

    @IsNotEmpty({ message: "isDeleted es obligatorio" })
    isDeleted!: number
}
