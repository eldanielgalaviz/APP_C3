export interface Project {
  Id_projects:          number;
  folio_project:        string;
  project_name:         string;
  id_aggregation:       number;
  project_counterpart:  string;
  id_agrarian_nucleus:    number;
  link_property_polygon: string | null;
  Id_land_tenure:       number | null;
  id_status_project:    number;
  status:               number;
}