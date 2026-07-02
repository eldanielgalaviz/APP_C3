export interface legalDueDiligence {
    Id_legal_due_diligence:                  number;
    project_id:                              number;
    loi_signed_date:                         string;
    kyc_completed:                           string;
    cd_requested_to_ran:                     string;
    cb_completed:                            number;
    erpa_signed_date:                        string;
    buyer:                                   string;
    project_aggregator:                      string;
    project_developer:                       string;
    project_coordinator:                     string;
    project_coordinator_term_date:           string;
    kyc_submission_date:                     string;
    id_mekyc_status:                         number;
    kyc:                                     string;
    specific_conditions_prescedent:          string;
    notes_legal_team:                        string;
    Date:                                   string;
    NameUser:                               string;
}

export interface LegalDueDiligencePayload {
  p_Id_project:                     number;
  p_loi_signed_date:                string | null;
  p_cd_requested_to_ran:            string | null;
  p_cb_completed:                   number | null;
  p_erpa_signed_date:               string | null;
  p_buyer:                          string | null;
  p_project_aggregator:             string | null;
  p_project_developer:              string | null;
  p_project_coordinator:            string | null;
  p_project_coordinator_term_date:  string | null;
  p_specific_conditions_prescedent: string | null;
  p_notes_legal_team:               string | null;
}