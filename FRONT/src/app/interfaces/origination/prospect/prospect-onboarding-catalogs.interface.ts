export interface State {
  Id_states:  number;
  state_name: string;
}

export interface ProjectState {
  Id_state:   number;
  state_name: string;
}

export interface Municipality {
  Id_municipalities: number;
  Id_municipality:   number;
  municipality_name: string;
}

export interface Neighborhood {
  Id_postal_code:    number;
  neighborhood_name: string;
}

export interface LandTenureType {
  Id_land_tenure:   number;
  land_tenure_type: string;
}

export interface PropertyType {
  Id_property_type: number;
  description:      string;
}

export interface Programme {
  Id_program: number;
  program:    string;
}

export interface ProspectPriority {
  Id_prospect_priority: number;
  prospec_priority:     string;
}

export interface AgrarianNucleus {
  Id_agrarian_nucleus: number;
  nucleus_name:        string;
}

export interface LocationByCP {
  state_name:        string;
  municipality_name: string;
  neighborhood_name: string;
  Id_postal_code:    number;
}