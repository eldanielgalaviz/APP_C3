export interface PrePinOriginationPayload {
  p_Id_project:                               number;
  p_descriptions:                             string;
  p_id_certification_program:                 number | undefined;
  p_id_registration_route:                    number | undefined;
  p_id_methodology:                           number | undefined;
  p_project_area:                             string;
  p_id_project_condition:                     number | undefined;
  p_id_licences_permits:                      number | undefined;
  p_id_confidence_of_crediting_activity_area: number | undefined;
  p_id_umafor:                                string | null;
  p_authorizedHarvestingVolume:               number | null;
  p_underlying_activities:                    string;
  p_percentage_mki_price:                     number | null;
  p_conficence_upfront_costs:                 string;
  p_cba:                                      number | undefined;
  p_irr:                                      string;
  p_credit_type:                              string;
}

export interface PrePinMrvPayload {
  p_Id_project:                number;
  p_id_estimate_permanence:    number | undefined;
  p_estimate_sample_size:      string;
  p_id_estimate_mrv:           number | undefined;
  p_id_estimate_leakage:       number | undefined;
  p_id_estimate_reversal_risk: string | null;
  p_Id_buffer_pool:            number | undefined;
  p_Id_inventory_stratification: number | undefined;
}

export interface PrePinSafeguardsPayload {
  p_Id_project:              number;
  p_id_safeguards:           number | undefined;
  p_id_social_community:     number | undefined;
  p_id_shareholders:         number | undefined;
  p_id_press_negative:       number | undefined;
  p_id_biodiversity:         number | undefined;
  p_id_human_rights:         number | undefined;
  p_id_indigenous_people:    number | undefined;
  p_id_h_s:                  number | undefined;
  p_id_negative_ehs:         number | undefined;
  p_Id_grievance_mechanism:  number | undefined;
}