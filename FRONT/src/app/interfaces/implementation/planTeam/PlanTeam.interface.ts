export interface PlanAndTeam {
    id_plan_team:               number;
    projects_id:                number;
    project_manager_id:         number;
    document_preparation_date:  Date;
    presentation_assembly_date: Date;
    project_log_id:             number;
    implementation_partner_id:  number;
    id_status_project:          number;
    smes:                       SmesByPlanAndTeam[];
}

export interface SmesByPlanAndTeam {
    id_smes_rel_plan_team: number;
    plan_team_id:          number;
    id_sme:                number;
    date_created:          Date;
}

export interface SmePayload {
  p_id_smes_rel_plan_team: number;
  p_plan_team_id:          number;
  p_id_sme:                number;
  p_status:                number; 
}

export interface SetPlanTeamPayload {
  p_id_plan_team:                number;
  p_projects_id:                 number;
  p_project_manager_id:          string | null | undefined;
  p_document_preparation_date:   string | null;
  p_presentation_assembly_date:  string | null;
  p_project_log_id:              number;
  p_implementation_partner_id:   string | null | undefined;
  p_status_project:              string | null | undefined;
  smes:                          SmePayload[];
}