import {
  IsNotEmpty,
} from "class-validator";

export class CbaImportRequest {
    @IsNotEmpty({ message: "p_ers_from_restoration es obligatorio" })
  	p_ers_from_restoration!: string;

    @IsNotEmpty({ message: "p_initial_investment es obligatorio" })
    p_initial_investment!: string;

    @IsNotEmpty({ message: "p_project_cost es obligatorio" })
    p_project_cost!: string;
}