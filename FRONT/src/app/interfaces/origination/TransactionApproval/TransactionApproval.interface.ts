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
}