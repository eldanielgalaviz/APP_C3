export interface legalDueDiligence {
    Id_legal_due_diligence:                  number;
    project_id:                              number;
    id_legal_lead:                           number;
    id_legal_dd_status:                      number;
    loi_signed_date:                         string;
    kyc_completed:                           number;
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
    kyc:                                     number;
    specific_conditions_prescedent:          string;
    notes_legal_team:                        string;
}