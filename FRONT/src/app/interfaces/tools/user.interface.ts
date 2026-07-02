export interface User {
  Iduser:                number;
  Name:                  string;
  AP:                    string;
  AM:                    string;
  Email:                 string;
  short_position_desc:   string;
  short_department_desc: string;
  short_status_user_desc: string;
  department_id:         number | null;   
  Idpositionuser:        number | null;
  puesto:                string;
  Idstatususer:          number;
  Idlocationkey:         number | null;
}

export interface SetUserPayload {
  Iduser:         number;
  Name:           string;
  AP:             string;
  AM:             string;
  Email:          string;
  PasswordHash:   string;
  puesto:         string;
  departamento:   number | null;
  Idlocationkey:  number | null;
  Idstatususer:   number;
  Idpositionuser: number | null;
}