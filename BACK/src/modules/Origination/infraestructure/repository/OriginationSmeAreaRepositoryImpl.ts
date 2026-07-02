import { executeViews } from "../../../../shared/db/CallStoredProcedures/CallStoredProcedures";
import { CatalogSmeAreaRepository } from "../../domain/Repositories/OriginationCatalogsRepository";

export interface SmesAreas {
  id_sme: number;
  sme_area: number;
  short_department_desc: string;
  lead_name: string;
}
export class OriginationSmeAreaRepositoryImpl implements CatalogSmeAreaRepository {

  async getOriginationSmeArea(): Promise<any> {
    const result = await executeViews('vw_sme_area');
    const smesAll = result[0];
    
    const employeesByArea = smesAll.reduce((acc: any = {}, employee: SmesAreas) => {
      if (!acc[employee.short_department_desc]) {
        acc[employee.short_department_desc] = [];
      }

      acc[employee.short_department_desc].push(employee);

      return acc;
    }, {});
    
    return employeesByArea;
  }
  
}