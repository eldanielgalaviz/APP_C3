export interface TechnicalDueDiligenceByProject {
    id_tdd_documents:  number;
    projects_id:       number;
    milestone_id:      number;
    large_description: string;
    document_names:    string;
    document_url:      string;
    generate_date:     Date;
    status_id:         number;
    status_document:   string;
    approved_date:     Date;
    id_user_approved:  number;
    approved_by:       string;
}

