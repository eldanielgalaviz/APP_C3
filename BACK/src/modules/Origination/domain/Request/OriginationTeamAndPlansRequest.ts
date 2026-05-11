import {
  IsNotEmpty,
  IsInt,
} from "class-validator";


export class TeamAndPlansRequest {
  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsInt({ message: "p_id_lead_originacion debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_lead_originacion es obligatorio" })
  p_id_lead_originacion!: number;

  @IsInt({ message: "p_id_origination_promoter debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_origination_promoter es obligatorio" })
  p_id_origination_promoter!: number;

  @IsInt({ message: "p_id_sme_dev_impl debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_sme_dev_impl es obligatorio" })
  p_id_sme_dev_impl!: number;

  @IsInt({ message: "p_id_sme_legal debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_sme_legal es obligatorio" })
  p_id_sme_legal!: number;

  @IsInt({ message: "p_id_sme_safeguards debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_sme_safeguards es obligatorio" })
  p_id_sme_safeguards!: number;

  @IsInt({ message: "p_id_sme_mrv debe ser un número entero" })
  @IsNotEmpty({ message: "p_id_sme_mrv es obligatorio" })
  p_id_sme_mrv!: number;
}