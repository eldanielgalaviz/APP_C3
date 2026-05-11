import {
  IsNotEmpty,
  MinLength,
  MaxLength,
} from "class-validator";

export class ToolsUserModuleRequest {

  @IsNotEmpty({ message: "p_Iduser es obligatorio" })
  p_Iduser!: number;

  @IsNotEmpty({ message: "p_Idmodule es obligatorio" })
  @MinLength(3, { message: "El p_Idmodule debe tener al menos 3 caracteres",})
  @MaxLength(100, { message: "El p_Idmodule no puede superar los 250 caracteres",})
  p_Idmodule!: string;
  
}