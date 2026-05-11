import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  imports: [SHARED_IMPORTS],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  items!: MenuItem[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: "Catalogs",
        items: [
          {
            label: 'Accounts',
           command: () => {
              this.router.navigate(['tools']);
            }
          },
          {
            label: 'Subaccounts',
            command: () => {
              this.router.navigate(['tools/ToolsSubaccounts']);
            }
          },
       
          {
            label: 'Activities',
            command: () => {
              this.router.navigate(['tools/ToolsActivities']);
            }
          },
          {
            label: 'Milestone',
            command: () => {
              this.router.navigate(['tools/ToolsMilestone']);
            }
          },
          {
            label: 'Evidences',
            command: () => {
              this.router.navigate(['tools/ToolsEvidences']);
            }
          },
          {
            label: 'Adjustment types',
            command: () => {
              this.router.navigate(['tools/ToolsAdjtypes']);
            }
          },
          {
            label: 'SOP',
            command: () => {
              this.router.navigate(['tools/ToolsSop']);
            }
          },
          {
            label: 'Indicators',
            command: () => {
              this.router.navigate(['tools/ToolsIndicadors']);
            }
          },
        ]
      },
      {
        label: "Evaluators module",
        items: [
          {
            label: 'Expenses review evaluators',
            command: () => {
              this.router.navigate(['tools/ToolsEvSubacounts']);
            }
          },
        ]
      },
      {
        label: "Security",
        items: [
             {
            label: 'Subprocess',
            command: () => {
              this.router.navigate(['tools/ToolsSubprocess']);
            }
          },
          {
            label: 'Menus',
            command: () => {
              this.router.navigate(['tools/ToolsMenu']);
            }
          },
          {
            label: 'Roles',
            command: () => {
              this.router.navigate(['tools/ToolsPerfiles']);
            }
          },
          {
            label: 'Users',
            command: () => {
              this.router.navigate(['tools/ToolsUsers']);
            }
          },
        ]
      },

    ];
  }
}