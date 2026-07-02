export interface Ped {
  Id_ped_origination:              number;
  Id_ped_sig:                      number;
  projects_id:                     number;
  ped_ap_result_id:                number;
  can_include_anp_or_advc:         number;
  can_include_psa:                 number;
  requires_commercial_agriculture: number;
  requires_subsidies:              number;
  pedaa_section_id:                number;
  aa_population_id:                number;
  agricultural_activity_id:        number;
  survey_id:                       number;
  aa_subsidy_id:                   number;
  aa_steep_id:                     number;
  aa_coverage_change_id:           number;
  pedaa_result_id:                 number;
  pedaa_link:                      string;
  pedaa_observations:              string;
  DatePedOrigination:              string;
  NameUserPedOrigination:          string;
  DatePedSig:                      string;
  NameUserPedSig:                  string;
}

export interface PedOriginationPayload {
  p_id_ped_origination:            number;
  p_projects_id:                   number;
  p_ped_ap_result_id:              number | null;
  p_can_include_anp_or_advc:       number | null;
  p_can_include_psa:               number | null;
  p_requires_commercial_agriculture: number | null;
  p_requires_subsidies:            number | null;
}

export interface PedSigPayload {
  p_id_ped_sig:                    number;
  p_projects_id:                   number;
  p_pedaa_section_id:              number | null;
  p_aa_population_id:              number | null;
  p_agricultural_activity_id:      number | null;
  p_survey_id:                     number | null;
  p_aa_subsidy_id:                 number | null;
  p_aa_steep_id:                   number | null;
  p_aa_coverage_change_id:         number | null;
  p_pedaa_result_id:               number | null;
  p_pedaa_link:                    string;
  p_pedaa_observations:            string;
}