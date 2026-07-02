export interface OverviewRepository {
  getOverviewRepository(idProject: number): Promise<any>;
}