export interface prospectOnboarding {
    Id_prospect_contact:        number;
    projects_id:                number;
    prospect_contact_name:      string;
    prospect_contact_role:      string;
    prospect_contact_telephone: string;
    prospect_contact_email:     string;
    postal_code:                number;
    postal_code_id:             number;
    neighborhood_id:            number;
    Id_municipality:            number;
    Id_state:                   number;
    street:                     string;
    exterior_number:            number;
    interior_number:            number;
    program_id:                 number;
    id_property_type:           number;
    prospect_priority_id:       number;
    prospect_description:       string;
    project_name:               string;
    project_counterpart:        string;
    Id_agrarian_nucleus:        number;
    link_property_polygon:      string;
    Id_land_tenure:             number;
    nucleo_agrario:             number | null;
    Date?:                       string;
    NameUser?:                   string;
}

export interface OriginationOverview {
  project_name:         string;
  project_counterpart:  string;
  state_name:           string;
  municipality_name:    string;
  Id_agrarian_nucleus:  number;
  nucleus_name:         string;
  Id_land_tenure:       number;
  projects_id:          number;
  id_property_type:     number;
  prospect_priority_id: number;
  project_coordinator:  string;
  project_manager_id:   number;
  project_manager_name: string;
}
export interface ProspectOnboardingPayload {
  Id_prospect_contact:        number;
  projects_id:                number | null;
  prospect_contact_name:      string;
  prospect_contact_role:      string;
  prospect_contact_telephone: string;
  prospect_contact_email:     string;
  postal_code_id:             number | null;
  neighborhood_id:            number | null;
  municipalities_id:          number | null;
  street:                     string;
  exterior_number:            number;
  interior_number:            number | null;
  program_id:                 number | null;
  id_property_type:           number | null;
  prospect_priority_id:       number | null;
  project_alive_id:           number;
  project_description:        string;
  project_name:               string;
  project_counterpart:        string;
  Id_state:                   number | null;
  Id_municipality:            number | null;
  id_agrarian_nucleus:        number | null;
  link_property_polygon:      string | null;
  Id_land_tenure:             number | null;
  nucleo_agrario: number | null;
}