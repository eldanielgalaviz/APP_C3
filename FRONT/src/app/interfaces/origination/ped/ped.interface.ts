export interface Ped {
    Id_ped:                          number;
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
}
