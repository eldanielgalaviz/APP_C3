export interface projectApproval {
    Id_project_approval:                              number;
    project_id:                                       number;
    dd_pack_to_mercuria_submission_date:              string;
    informal_assembly_to_present_project_done_date:   string;
    mercuria_questions_answered_date:                 string;
    dd_pack_approved_by_mercuria_date:                string;
    Date:                                             string;
    NameUser:                                         string;
}

export interface ProjectApprovalPayload {
  p_Id_project:                                      number;
  p_dd_pack_to_mercuria_submission_date:             string | null;
  p_informal_assembly_to_present_project_done_date:  string | null;
  p_mercuria_questions_answered_date:                string | null;
  p_dd_pack_approved_by_mercuria_date:               string | null;
}