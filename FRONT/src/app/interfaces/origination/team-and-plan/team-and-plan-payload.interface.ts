export interface TeamAndPlanPayload {
  p_Id_project:              number;
  p_id_lead_originacion:     number | undefined;
  p_id_origination_promoter: number | undefined;
  p_id_sme_dev_impl:         number | undefined;
  p_id_sme_legal:            number | undefined;
  p_id_sme_safeguards:       number | undefined;
  p_id_sme_sig:              number | undefined;
  p_id_sme_mrv:              number | undefined;
}