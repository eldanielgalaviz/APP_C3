import { Injectable } from '@angular/core';
import { Project } from '../../app/interfaces/projects/projects.interface';
import { BehaviorSubject, Observable } from 'rxjs';

const initProyecto: Project = {
  Id_projects:           0,
  folio_project:         '',
  project_name:          '',
  id_aggregation:        0,
  project_counterpart:   '',
  id_agrarian_nucleus:     0,
  link_property_polygon: null,
  Id_land_tenure:        null,
  id_status_project:     0,
  status:                0
}

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private proyecto$ = new BehaviorSubject<Project>(initProyecto);

  constructor() { }

    get selectedProject$() : Observable<Project> {
        return this.proyecto$.asObservable();
    }

    setProject(project : Project) : void {
      this.proyecto$.next(project);
    }
    
    resetProject(): void {
      this.proyecto$.next(initProyecto);
    }

}
