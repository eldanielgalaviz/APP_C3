import {
  IsNotEmpty,
  IsInt,
} from "class-validator";

export class legalKYCRequest {
  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsNotEmpty({ message: "date_kyc_pack_prepared es obligatorio" })
  p_date_kyc_pack_prepared!: string;

  @IsNotEmpty({ message: "date_kyc_sent_to_mercuria es obligatorio" })
  p_date_kyc_sent_to_mercuria!: string;

  @IsNotEmpty({ message: "date_kyc_approval_by_mercuria es obligatorio" })
  p_date_kyc_approval_by_mercuria!: string;
}
