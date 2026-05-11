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
