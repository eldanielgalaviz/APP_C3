export interface Contracting {
  Id_contrating:                                               number;
  Id_project:                                                  number;
  erpa_signed_by_buyer:                                        string;
  erpa_signed_by_project_counterpart:                          string;
  project_developer_contract_signed_by_project_counterpart:    string;
  aggregation_approval_signed_by_project_counterpart:          string;
  authority_designation_format_signed:                         string;
  terms_of_use_signed_project_counterpart:                     string;
  project_developer_contract_signed_by_canopia:                string;
  Date:                                                        string;
  NameUser:                                                    string;
}

export interface ContractingPayload {
  p_Id_project:                                                    number;
  p_erpa_signed_by_buyer:                                          string | null;
  p_erpa_signed_by_project_counterpart:                            string | null;
  p_project_developer_contract_signed_by_project_counterpart:      string | null;
  p_aggregation_approval_signed_by_project_counterpart:            string | null;
  p_authority_designation_format_signed:                           string | null;
  p_terms_of_use_signed_project_counterpart:                       string | null;
  p_project_developer_contract_signed_by_canopia:                  string | null;
}