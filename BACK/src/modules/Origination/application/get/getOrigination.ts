import { OriginationRequest } from '../../domain/Request/OriginationRequest';
import { CatalogsRepository } from '../../domain/Repositories/OriginationCatalogsRepository';
import { OriginationRepository, ProjectsRepository } from '../../domain/Repositories/OriginationRepository';
import { ProjectAreasRepository } from '../../../feasibility-project-area/domain/Repositories/OriginationProjectAreasRepository';

export class getOrigination {
  constructor(private repository: OriginationRepository) {}

  async run(origination: number): Promise<OriginationRequest> {
    return this.repository.getOriginationRepository(origination);
  }
}

export class getCatalogs {
  constructor(private repository: CatalogsRepository) {}

  async run(): Promise<any> {
    return this.repository.getCatalog;
  }
}

export class getProject {
  constructor(private repository: ProjectAreasRepository) {}

  async run(): Promise<any> {
    return this.repository.getProjectAreasRepository;
  }
}

export class getProjects {
  constructor(private repository: ProjectsRepository) {}

  async run(): Promise<any> {
    return this.repository.getProjectsRepository();
  }
}




