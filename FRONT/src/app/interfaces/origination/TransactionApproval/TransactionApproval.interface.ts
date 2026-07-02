export interface TransactionApprovalItem {
  Id_transaction_approval:                                      number;
  id_project:                                                   number;
  erpa_approval_by_buyer_date:                                  string;
  project_approval_date:                                        string;
  erpa_approval_by_project_counterpart_date:                    string;
  id_approved_buyer:                                            number;
  percentage_mkt_price:                                         number;
  project_developer_contract_approved_by_project_counterpart:   string;
  aggregation_approval_by_project_counterpart_date:             string;
  project_developer_contract_approved_by_canopia_date:          string;
  Date:                                                         string;
  NameUser:                                                     string;
}

export interface TransactionApprovalPayload {
  p_Id_project:                                                      number;
  p_erpa_approval_by_buyer_date:                                     string | null;
  p_project_approval_date:                                           string | null;
  p_project_developer_contract_approved_by_canopia_date:             string | null;
  p_erpa_approval_by_project_counterpart_date:                       string | null;
  p_id_approved_buyer:                                               number | null;
  p_percentage_mkt_price:                                            number | null;
  p_project_developer_contract_approved_by_project_counterpart:      string | null;
  p_aggregation_approval_by_project_counterpart_date:                string | null;
}

export interface ApprovedBuyer {
  id_approved_buyer: number;
  approved_buyer:    string;
}