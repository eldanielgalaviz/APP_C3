import { Component } from '@angular/core';
import { ReportActivityComponent } from './report-activity/report-activity.component';
import { PlViewActivityComponent } from '../../annual-planning/pl-view-plan/pl-view-plan-act-details/pl-view-activity/pl-view-activity.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CustomerService } from '../../../../../../../service/customerservice';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../../../../shared/imports';

interface Status {
  name: string;
  styleClass: string;
}

@Component({
  selector: 'app-am-report-view',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ReportActivityComponent, PlViewActivityComponent],
  standalone: true,  
  providers: [CustomerService, ConfirmationService, MessageService],
  templateUrl: './am-report-view.component.html',
  styleUrl: './am-report-view.component.scss'
})
export class AmReportViewComponent {

  status: Status[] | undefined;
   items: MenuItem[] | undefined;

    constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

     ngOnInit() {

    this.status = [
      {
        name: 'Pending',
        styleClass: 'pending'
      },
      {
        name: 'Correction',
        styleClass: 'correction'
      },
      {
        name: 'Evaluation',
        styleClass: 'evaluation'
      },
      {
        name: 'Approved',
        styleClass: 'approved'
      },
      {
        name: 'Canceled',
        styleClass: 'cancel'
      },
      {
        name: 'Approved by assembly',
        styleClass: 'approved-asam'
      }
    ];

    this.items = [
      {
        label: 'Download reporte avance',
      },


    ];
  }


}

