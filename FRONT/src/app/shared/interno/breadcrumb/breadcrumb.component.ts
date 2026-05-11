import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SHARED_IMPORTS } from '../../imports';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ObservableService } from '../../../../service/observable/Observable.service'; 
import { Project } from '../../../interfaces/projects/projects.interface'; 

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/portafolio' };
  projectName: string = '';                          
  private projectSub!: Subscription;

  private routeMap: { [key: string]: { label: string; parent?: string; showProject?: boolean } } = {
    'portafolio':      { label: '',             showProject: true },
    'prospect':        { label: 'Prospect Onboarding',    parent: 'Origination' },
    'feasibility':     { label: 'Feasibility',            parent: 'Origination' },
    'legal':           { label: 'Legal Due Diligence',    parent: 'Origination' },
    'technical':       { label: 'Technical Due Diligence',parent: 'Origination' },
    'approval':        { label: 'Project Approval',       parent: 'Origination' },
    'kyc':             { label: 'Legal KYC',              parent: 'Origination' },
    'transaction':     { label: 'Transaction Approval',   parent: 'Origination' },
    'contrating':      { label: 'Contracting',            parent: 'Origination' },
    'ToolsPerfiles':   { label: 'Roles',                  parent: 'Tools' },
    'ToolsUsers':      { label: 'Users',                  parent: 'Tools' },
    'ToolsMenu':       { label: 'Menu',                   parent: 'Tools' },
    'ToolsSubprocess': { label: 'Subprocess',             parent: 'Tools' },
    'tools':           { label: 'Accounts',               parent: 'Tools' },
    'ToolsSubaccounts':{ label: 'Subaccounts',            parent: 'Tools' },
    'ToolsActivities': { label: 'Activities',             parent: 'Tools' },
    'ToolsMilestone':  { label: 'Milestones',             parent: 'Tools' },
    'ToolsEvidences':  { label: 'Evidences',              parent: 'Tools' },
    'ToolsAdjtypes':   { label: 'Adjustment types',       parent: 'Tools' },
    'ToolsSop':        { label: 'SOP',                    parent: 'Tools' },
    'ToolsIndicadors': { label: 'Indicadors',             parent: 'Tools' },
    'ToolsEvSubacounts': { label: 'Expenses review evaluators',       parent: 'Tools' },







  };

  constructor(
    private router: Router,
    private observableService: ObservableService   
  ) {}

  ngOnInit() {
    this.projectSub = this.observableService.selectedProject$.subscribe((project: Project) => {
      this.projectName = project?.project_name ?? '';
      this.buildBreadcrumb(this.router.url);
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.buildBreadcrumb(event.urlAfterRedirects);
    });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  private buildBreadcrumb(url: string) {
    const segment = url.split('/').pop() || '';
    const route = this.routeMap[segment];

    if (route) {
      this.items = [
        ...(this.projectName ? [{ label: this.projectName }] : []), 
        ...(route.parent ? [{ label: route.parent }] : []),      
        { label: route.label }                                    
      ];
    } else {
      this.items = [];
    }
  }
}