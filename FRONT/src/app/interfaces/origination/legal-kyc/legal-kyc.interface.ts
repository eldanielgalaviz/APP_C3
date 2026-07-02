export interface legalKyc {
  Id_legal_kyc:                    number;
  id_project:                      number;
  kyc_completed:                   string;
  id_mekyc_status:                 number;
  date_kyc_pack_prepared:          string;
  date_kyc_sent_to_mercuria:       string;
  date_kyc_approval_by_mercuria:   string;
  file_path_DOF_RP:                string;
  file_path_phina:                 string;
  file_path_acta_eleccion_autoridades: string;
  file_path_identificacion_autoridades: string;
  Date:                            string;
  NameUser:                        string;

}

export interface LegalKycPayload {
  p_Id_project:                      number;
  p_kyc_completed:                   string;
  p_id_mekyc_status:                 number | null;
  p_date_kyc_pack_prepared:          string | null;
  p_date_kyc_sent_to_mercuria:       string | null;
  p_date_kyc_approval_by_mercuria:   string | null;
  p_file_path_DOF_RP:                string | null;
  p_file_path_phina:                 string | null;
  p_file_path_acta_eleccion_autoridades:  string | null;
  p_file_path_identificacion_autoridades: string | null;

}