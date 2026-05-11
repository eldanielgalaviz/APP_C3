export interface CbaImports {
    type:        string;
    projects_id: number;
    total_amount:string;
    account:     string;
    rps:         Rp[];
}

export interface Rp {
    rp_id:  number;
    budget: number;
}
