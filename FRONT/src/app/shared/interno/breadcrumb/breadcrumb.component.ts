import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PRIMENG_NAVIGATION } from '../../imports';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ObservableService } from '../../../../service/observable/Observable.service';
import { Project } from '../../../interfaces/projects/projects.interface';
import { authGuardService } from '../../../../service/authGuard.service';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [...PRIMENG_NAVIGATION],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  items: MenuItem[] = [];
  home: MenuItem = {
    icon: 'pi pi-home',
    command: () => {
      this._authGuardService    
        ? sessionStorage.removeItem('selectedOption') : null;
      this.observableService.setProject(null as any);
      this.router.navigate(['/Inicio']);
    }
  };

  projectName: string = '';
  private projectSub!: Subscription;

  private routeMap: {
    [key: string]: {
      label: string;
      parent?: string;
      showProject?: boolean;
      clickable?: boolean;
    };
  } = {

      /*
      |--------------------------------------------------------------------------
      | ROOT
      |--------------------------------------------------------------------------
      */

      'portafolio': { label: '', showProject: true },

      /*
      |--------------------------------------------------------------------------
      | MODULES
      |--------------------------------------------------------------------------
      */

      'origination': {
        label: 'Origination',
        clickable: false
      },

      'implementation': {
        label: 'Implementation',
        clickable: false
      },

      'tools-root': {
        label: 'Tools',
        clickable: false
      },

      /*
      |--------------------------------------------------------------------------
      | ORIGINATION
      |--------------------------------------------------------------------------
      */

      'prospect': {
        label: 'Prospect Onboarding',
        parent: 'origination'
      },

      'feasibility': {
        label: 'Feasibility',
        parent: 'origination'
      },

      'legal': {
        label: 'Legal Due Diligence',
        parent: 'origination'
      },

      'technical': {
        label: 'Technical Due Diligence',
        parent: 'origination'
      },

      'approval': {
        label: 'Project Approval',
        parent: 'origination'
      },

      'kyc': {
        label: 'Legal KYC',
        parent: 'origination'
      },

      'transaction': {
        label: 'Transaction Approval',
        parent: 'origination'
      },

      'contrating': {
        label: 'Contracting',
        parent: 'origination'
      },

      /*
      |--------------------------------------------------------------------------
      | IMPLEMENTATION
      |--------------------------------------------------------------------------
      */

      'pm-project': {
        label: 'Assign PM to project',
        parent: 'implementation'
      },

      'listing': {
        label: 'Listing',
        parent: 'implementation'
      },

      'baseline': {
        label: 'Baseline',
        parent: 'implementation'
      },

      'strategic-planning': {
        label: 'Strategic planning',
        parent: 'implementation'
      },

      'annual-planning': {
        label: 'Annual planning',
        parent: 'implementation',
      },

      'annual-planning/activity-planning': {
        label: 'Activity planning',
        parent: 'annual-planning'
      },

      'annual-planning/view-planning': {
        label: 'View planning',
        parent: 'annual-planning'
      },

      'financial-monitoring': {
        label: 'Financial monitoring',
        parent: 'implementation'
      },

      'trainning': {
        label: 'Trainning',
        parent: 'implementation'
      },

      'activity-monitoring': {
        label: 'Activity monitoring',
        parent: 'implementation',
      },

      'activity-monitoring/activity-report-view': {
        label: 'Activity report view',
        parent: 'activity-monitoring'
      },

      'review': {
        label: 'Review',
        parent: 'implementation'
      },

      /*
      |--------------------------------------------------------------------------
      | TOOLS
      |--------------------------------------------------------------------------
      */

      'ToolsPerfiles': {
        label: 'Roles',
        parent: 'tools-root'
      },

      'ToolsUsers': {
        label: 'Users',
        parent: 'tools-root'
      },

      'ToolsMenu': {
        label: 'Menu',
        parent: 'tools-root'
      },

      'ToolsSubprocess': {
        label: 'Subprocess',
        parent: 'tools-root'
      },

      'tools': {
        label: 'Accounts',
        parent: 'tools-root'
      },

      'ToolsSubaccounts': {
        label: 'Subaccounts',
        parent: 'tools-root'
      },

      'ToolsActivities': {
        label: 'Activities',
        parent: 'tools-root'
      },

      'ToolsMilestone': {
        label: 'Milestones',
        parent: 'tools-root'
      },

      'ToolsEvidences': {
        label: 'Evidences',
        parent: 'tools-root'
      },

      'ToolsAdjtypes': {
        label: 'Adjustment types',
        parent: 'tools-root'
      },

      'ToolsSop': {
        label: 'SOP',
        parent: 'tools-root'
      },

      'ToolsIndicadors': {
        label: 'Indicadors',
        parent: 'tools-root'
      },

      'ToolsEvSubacounts': {
        label: 'Expenses review evaluators',
        parent: 'tools-root'
      }

    };

  constructor(
    private router: Router,
    private observableService: ObservableService,
    private _authGuardService: authGuardService
  ) { }

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

  private buildBreadcrumb(url: string): void {

    const breadcrumbs: MenuItem[] = [];

    // Nombre proyecto
    if (this.projectName) {
      breadcrumbs.push({
        label: this.projectName
      });
    }

    const cleanUrl = url
      .split('?')[0]
      .replace(/^\/+/, '');

    const segments = cleanUrl.split('/');

    /*
    |--------------------------------------------------------------------------
    | Detect nested route
    |--------------------------------------------------------------------------
    */

    const nestedRouteKey = segments.slice(-2).join('/');

    /*
    |--------------------------------------------------------------------------
    | Current route
    |--------------------------------------------------------------------------
    */

    const currentRouteKey = this.routeMap[nestedRouteKey]
      ? nestedRouteKey
      : segments[segments.length - 1];

    const route = this.routeMap[currentRouteKey];

    if (!route) {
      this.items = breadcrumbs;
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | BUILD PARENTS
    |--------------------------------------------------------------------------
    */

    const parentStack: MenuItem[] = [];

    let currentParent = route.parent;

    while (currentParent) {

      const parentRoute = this.routeMap[currentParent];

      if (!parentRoute) {

        parentStack.unshift({
          label: currentParent
        });

        break;
      }

      parentStack.unshift({
        label: parentRoute.label,
        routerLink: parentRoute.clickable === false
          ? undefined
          : this.buildFullRoute(currentParent)
      });

      currentParent = parentRoute.parent;
    }

    breadcrumbs.push(...parentStack);

    /*
    |--------------------------------------------------------------------------
    | CURRENT ROUTE
    |--------------------------------------------------------------------------
    */

    breadcrumbs.push({
      label: route.label,
      routerLink: this.buildFullRoute(currentRouteKey)
    });

    this.items = breadcrumbs;
  }

  private buildFullRoute(routeKey: string): string {

    const paths: string[] = [];

    let currentKey: string | undefined = routeKey;

    while (currentKey) {

      paths.unshift(currentKey);

      const currentRoute: {
        label: string;
        parent?: string;
        showProject?: boolean;
        clickable?: boolean;
      } | undefined = this.routeMap[currentKey];

      if (!currentRoute) {
        break;
      }

      currentKey = currentRoute.parent;
    }

    const cleanPaths = paths.filter(path =>
      !['tools-root'].includes(path)
    );

    return '/portafolio/' + cleanPaths.join('/');
  }
}