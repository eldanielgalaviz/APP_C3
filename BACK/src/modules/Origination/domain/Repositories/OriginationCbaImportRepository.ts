export interface CbaImportRepository {
  getcbaImportRepository(idProject: number): Promise<any>;
  setcbaImportRepository(data: any, userId: number): Promise<any>;
}