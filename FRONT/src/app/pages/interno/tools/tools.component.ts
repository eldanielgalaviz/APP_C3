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

  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: "Catalogos",
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
            label: 'Subprocess',
            command: () => {
              this.router.navigate(['tools/ToolsSubprocess']);
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
            label: 'Adjustment Types',
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
            label: 'Indicadors',
            command: () => {
              this.router.navigate(['tools/ToolsIndicadors']);
            }
          },
        ]
      },
      {
        label: "Evaluators modulos",
        items: [
          {
            label: 'Evaluators subaccounts',
            command: () => {
              this.router.navigate(['tools/ToolsEvSubacounts']);
            }
          },
          {
            label: 'Evaluators settlement',
            command: () => {
              this.router.navigate(['tools/ToolsEvSettlement']);
            }
          },
        ]
      },
      {
        label: "Segurity",
        items: [
          {
            label: 'Perfiles',
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