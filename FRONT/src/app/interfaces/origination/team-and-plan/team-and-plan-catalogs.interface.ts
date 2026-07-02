export interface OriginationPromoterCat {
  Id_origination_promoter: number;
  origination_promoter:    string;
}

export interface SmeArea {
  id_sme:                 number;
  sme_area:               number;
  short_department_desc:  string;
  lead_name:              string;
}
export interface SmeAreaGrouped {
  Origination: SmeArea[];
  Development: SmeArea[];
  MRV:         SmeArea[];
  SIG:         SmeArea[];
  Safeguards:  SmeArea[];
  Legal:       SmeArea[];
}