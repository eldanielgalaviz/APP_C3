export interface ActivityAreaRepository {
  getActivityAreaRepository(idProject: number): Promise<any>;
  setActivityAreaRepository(data: any, userId: number): Promise<any>;
}