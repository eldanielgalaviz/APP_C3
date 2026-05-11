export interface PrePinAssumptionsRepository {
  getPrePinAssumptionsRepository(idProject: number): Promise<any>;
  setPrePinAssumptionsRepository(data: any, userId: number): Promise<any>;
}