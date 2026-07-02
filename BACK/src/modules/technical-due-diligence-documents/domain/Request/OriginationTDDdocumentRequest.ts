import {
  IsNotEmpty,
  IsOptional,
  IsInt,
} from "class-validator";

export class TechnicalDueDiligenceRequest {
    p_id_tdd_documents?: number;

    @IsNotEmpty({ message: "p_projects_id es obligatorio" })
    p_projects_id!: number;

    @IsNotEmpty({ message: "p_milestone_id es obligatorio" })
    p_milestone_id!: number;

    @IsOptional()
    p_document_names!: string;

    @IsOptional()
    p_document_url!: string;

    @IsNotEmpty({ message: "p_generate_date es obligatorio" })
    p_generate_date!: Date;

    @IsNotEmpty({ message: "p_status_id es obligatorio" })
    p_status_id!: number;
}