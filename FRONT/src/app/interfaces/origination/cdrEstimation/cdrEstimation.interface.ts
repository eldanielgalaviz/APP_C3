export interface CDREstimation {
    Id_cdr_estimation:         number;
    project_id:                number;
    ers_calculator_version_id: number;
    estimate_leake_age_id:     number;
    estimate_reversal_risk:    number;
    project_start_date:        Date;
    estimations:               Estimation[];
}

export interface Estimation {
    year:       number;
    annual_cdr: number;
}
