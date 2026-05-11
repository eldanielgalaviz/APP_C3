import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { MenuItem } from 'primeng/api';
import { ListPlanBeneComponent } from './ListPlanKeymiles/list-plan-bene/list-plan-bene.component';
import { ListPlanCommComponent } from './ListPlanKeymiles/list-plan-comm/list-plan-comm.component';
import { ListPlanImpleComponent } from './ListPlanKeymiles/list-plan-imple/list-plan-imple.component';
import { ListPlanOriginComponent } from './ListPlanKeymiles/list-plan-origin/list-plan-origin.component';
import { ListPlanRegisComponent } from './ListPlanKeymiles/list-plan-regis/list-plan-regis.component';
import { ListPlanRepoComponent } from './ListPlanKeymiles/list-plan-repo/list-plan-repo.component';
import { ListPlanSettComponent } from './ListPlanKeymiles/list-plan-sett/list-plan-sett.component';
import { ListPlanVeriComponent } from './ListPlanKeymiles/list-plan-veri/list-plan-veri.component';
import { Router,NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservableService } from '../../../../service/observable/Observable.service';
import { Project } from '../../../interfaces/projects/projects.interface';
import { userService } from '../../../../service/user.service';
import { authGuardService } from '../../../../service/authGuard.service';


interface Rp {
  name: string;
}

interface milestones {
  name: string;
}

@Component({
  selector: 'app-portafolio',
  imports: [SHARED_IMPORTS,
    ListPlanBeneComponent,
    ListPlanCommComponent,
    ListPlanImpleComponent,
    ListPlanOriginComponent,
    ListPlanRegisComponent,
    ListPlanRepoComponent,
    ListPlanSettComponent,
    ListPlanVeriComponent,
  ],

  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.scss'
})
export class PortafolioComponent {
  MenuGlobal: boolean = false;

  MenuProject: MenuItem[] | undefined;
  MenuGeneProject: MenuItem[] | undefined;
  Calendar: MenuItem[] | undefined;
  overview: boolean = false;
  projectlog: boolean = false;
  planning: boolean = false;
  gann: boolean = false;
  position!: 'bottom';
  rp: any[] | undefined;
  milestones: any[] | undefined;
  visible: boolean = false;
  hideTitle = false;
  form!: FormGroup;
  state: any[] | undefined;
  countries: any[] | undefined;
  selectedCountry?: Project;
  projectName: string = '';

  token: any;
  user: any;
  projects: Project[] = [];
  project: Project | null = null; 


    showDialog() {
      this.visible = true;
    }

  projectLog(position: 'bottom') {
    this.position = position;
    this.projectlog = true;
  }

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private readonly serviceObsProject$: ObservableService,
      private _authGuardService: authGuardService,
      private _userService: userService
  ) {
    this.token = this._authGuardService.getToken();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  observaProjectSelected() {
    this.serviceObsProject$.selectedProject$.subscribe((project: Project) => {
      this.project = project ?? null;  
      if (project) {
        this.selectedCountry = this.projects.find(x => x.Id_projects == project.Id_projects);
        this.projectName = project.project_name || '';
      }
      this.updateHideTitle();  
    });
  }

  updateHideTitle() {
    const isProspectRoute = this.router.url.includes('/portafolio/prospect');
    this.hideTitle = isProspectRoute && !this.project;
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  ngOnInit() {
    this.updateHideTitle();
    this.observaProjectSelected();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHideTitle();
    });

    this.getUserMenu();

    this.Calendar = [
      {
        label: 'Planning milestones',
        icon: 'pi pi-calendar-clock',
        command: () => {
          this.planning = true;
        }
      },
      {
        label: 'Diagrama Gannt',
        icon: 'pi pi-clock',
        command: () => {
          this.gann = true;
        }
      }
    ];

    this.rp = [
      { name: 'RP1' },
      { name: 'RP2' },
      { name: 'RP3' },
    ];

     this.milestones = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];
      this.form = this.fb.group({
      eventDate: [null, Validators.required],
      description: ['', Validators.required],
      decisions: ['', Validators.required],
      agreements: ['', Validators.required],
      milestone: [null, Validators.required],
      category: [null, Validators.required],
      typeEvidence: [null, Validators.required],
      notes: ['', Validators.required],
      rp: [null, Validators.required],
    });
  }

  getUserMenu(){
    this._userService.getUserMenu(this.token).subscribe(resp => {
      if(resp.valido === 1){
        this.MenuProject = resp.result[0]?.Menus
        this._authGuardService.setUserMenu(resp.result[0]?.Menus);
      }
    })
  }
}
