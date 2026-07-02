export interface LoggedUser {
  Iduser:      number;
  name:        string;
  email:       string;
  puesto:      string;
  AP:          string;
  AM?:         string;
  departamento?: string;
}