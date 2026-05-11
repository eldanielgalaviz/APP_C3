import {
  IsNotEmpty,
  IsInt,
} from "class-validator";

export class ToolsUserRoleRequest {
    
    @IsInt({ message: 'p_Iduser debe ser un número entero' })
    @IsNotEmpty({ message: "p_Iduser es obligatorio" })
    p_Iduser!: number;

    @IsInt({ message: 'p_Idrole debe ser un número entero' })
    @IsNotEmpty({ message: "p_Idrole es obligatorio" })
    p_Idrole!: number;
    
    @IsInt({ message: 'p_Idstatus debe ser un número entero' })
    @IsNotEmpty({ message: "p_Idstatus es obligatorio" })
    p_Idstatus!: number
}
