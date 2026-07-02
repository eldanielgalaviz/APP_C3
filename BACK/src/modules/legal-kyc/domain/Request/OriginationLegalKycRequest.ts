import {
  IsNotEmpty,
  IsInt,
  IsOptional
} from "class-validator";

export class legalKYCRequest {
  @IsInt({ message: "p_Id_project debe ser un número entero" })
  @IsNotEmpty({ message: "p_Id_project es obligatorio" })
  p_Id_project!: number;

  @IsOptional({ message: "date_kyc_pack_prepared es IsOptional" })
  p_date_kyc_pack_prepared!: string;

  @IsOptional({ message: "date_kyc_sent_to_mercuria es IsOptional" })
  p_date_kyc_sent_to_mercuria!: string;

  @IsOptional({ message: "date_kyc_approval_by_mercuria es IsOptional" })
  p_date_kyc_approval_by_mercuria!: string;

  @IsOptional({ message: "p_kyc_completed es IsOptional" })
  p_kyc_completed!: string;

  @IsOptional({ message: "p_id_mekyc_status es IsOptional" })
  @IsInt({ message: "p_id_mekyc_status debe ser un número entero" })
  p_id_mekyc_status!: number;
      
  @IsOptional({ message: "p_file_path_DOF_RP es IsOptional" })
  
  p_file_path_DOF_RP!: string;

  @IsOptional({ message: "p_file_path_phina es IsOptional" })
  
  p_file_path_phina!: string;

  @IsOptional({ message: "p_file_path_acta_eleccion_autoridades es IsOptional" })
  
  p_file_path_acta_eleccion_autoridades!: string;

  @IsOptional({ message: "p_file_path_identificacion_autoridades es IsOptional" })
  
  p_file_path_identificacion_autoridades!: string;

}
