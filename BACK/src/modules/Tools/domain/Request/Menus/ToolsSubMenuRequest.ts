import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from "class-validator";

export class ToolsSubMenuRequest {
    p_Idsubmenu?: number;

    @IsNotEmpty({ message: "p_short_submenu_desc es obligatorio" })
    @MinLength(4, { message: "El p_short_submenu_desc debe tener al menos 3 caracteres",})
    @MaxLength(100, { message: "El p_short_submenu_desc no puede superar los 250 caracteres",})
    p_short_submenu_desc!: string;

    @IsNotEmpty({ message: "p_long_submenu_desc es obligatorio" })
    @MinLength(4, { message: "El p_long_submenu_desc debe tener al menos 3 caracteres",})
    @MaxLength(500, { message: "El p_long_submenu_desc no puede superar los 250 caracteres",})
    p_long_submenu_desc!: string;

    @IsNotEmpty({ message: "p_router_link es obligatorio" })
    @MinLength(4, { message: "El p_router_link debe tener al menos 3 caracteres",})
    @MaxLength(255, { message: "El p_router_link no puede superar los 250 caracteres",})
    p_router_link!: string;

    @IsOptional()
    p_Idmainmenu!: number;

    @IsNotEmpty({ message: "isDeleted es obligatorio" })
    isDeleted!: number;

    @IsNotEmpty({ message: "p_order_index es obligatorio" })
    p_order_index!: number;
}
