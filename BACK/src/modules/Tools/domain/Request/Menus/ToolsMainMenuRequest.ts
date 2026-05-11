import {
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class ToolsMainMenuRequest {

    p_Idmainmenu?: number;

    @IsNotEmpty({ message: "p_short_main_desc es obligatorio" })
    @MinLength(3, { message: "El p_short_main_desc debe tener al menos 3 caracteres",})
    @MaxLength(100, { message: "El p_short_main_desc no puede superar los 250 caracteres",})
    p_short_main_desc!: string;

    @IsNotEmpty({ message: "p_long_main_desc es obligatorio" })
    @MinLength(3, { message: "El p_long_main_desc debe tener al menos 3 caracteres",})
    @MaxLength(100, { message: "El p_long_main_desc no puede superar los 250 caracteres",})
    p_long_main_desc!: string;

    @IsNotEmpty({ message: "p_Idstatus es obligatorio" })
    p_Idstatus!: number;

    @IsNotEmpty({ message: "p_order_index es obligatorio" })
    p_order_index!: number;

    @IsNotEmpty({ message: "p_module_ids es obligatorio" })
    p_module_ids!: string;
}