import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SHARED_IMPORTS } from '../../imports';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  items: MenuItem[] = [];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/portafolio' };

  // Mapa de segmento de ruta  { label, parent }
  private routeMap: { [key: string]: { label: string; parent?: string } } = {
    'prospect':    { label: 'Prospect Onboarding', parent: 'Origination' },
    'feasibility': { label: 'Feasibility',          parent: 'Origination' },
    'legal':       { label: 'Legal Due Diligence',  parent: 'Origination' },
    'technical':   { label: 'Technical Due Diligence', parent: 'Origination' },
    'approval':    { label: 'Project Approval',     parent: 'Origination' },
    'kyc':         { label: 'Legal KYC',            parent: 'Origination' },
    'transaction': { label: 'Transaction Approval', parent: 'Origination' },
    'contrating':  { label: 'Contracting',          parent: 'Origination' },
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.buildBreadcrumb(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.buildBreadcrumb(event.urlAfterRedirects);
    });
  }

  private buildBreadcrumb(url: string) {
    const segment = url.split('/').pop() || '';
    const route = this.routeMap[segment];

    if (route) {
      this.items = [
        ...(route.parent ? [{ label: route.parent }] : []),
        { label: route.label }
      ];
    } else {
      this.items = []; 
    }
  }
}