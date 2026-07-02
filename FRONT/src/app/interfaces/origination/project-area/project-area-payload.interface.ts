export interface ProjectAreaPayload {
  p_Id_project:               number;
  p_id_certification:         number | undefined;
  p_total_area:               number | null;
  p_achurado:                 number | null;
  p_expropriated_area:        number | null;
  p_file_path_phina:          string;
  p_total_perimeter_area_ran: number | null;
  p_ran_application:          number | undefined;
  p_internal_flat_surface:    number | null;
  p_expropriated_areas:       number | null;
  p_plan_yaer:                number;
  p_file_path_internal_flat:  string;
  p_id_ap_por_sig:            number;
  p_file_path_ap:             string;
  p_observations_ap:          string;
}