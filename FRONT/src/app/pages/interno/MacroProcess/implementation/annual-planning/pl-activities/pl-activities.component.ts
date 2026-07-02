import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../../../../shared/imports';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';

interface Rp {
  name: string;
}

@Component({
  selector: 'app-pl-activities',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION],
  providers: [CustomerService, MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './pl-activities.component.html',
  styleUrl: './pl-activities.component.scss'
})
export class PlActivitiesComponent {

  customers!: Customer[];

  cities: Rp[] | undefined;
  selectedCity: Rp | undefined;

  actions: MenuItem[] | undefined;
  activity: MenuItem[] | undefined;

  visible: boolean = false;

  constructor(private customerService: CustomerService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });

    this.cities = [
      { name: '01' },
      { name: '02' },
      { name: '03' },
    ];

    this.actions = [
      {
        label: 'New activity',
        icon: 'pi pi-plus', 
        routerLink:"activity-planning"
      },
      {
        label: 'New annual plan',
        icon: 'pi pi-plus',
        command: () => {
          this.visible = true;
        }
      },
      {
        label: 'Download draft',
        icon: 'pi pi-download'
      }
    ];
    this.activity = [
      {
        label: 'Copy activity',
        icon: 'pi pi-clone'
      },
      {
        label: 'Delete activity',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmationService.confirm({
            acceptButtonStyleClass: 'p-button-primary p-button-outlined',
            rejectButtonStyleClass: 'p-button-danger p-button-outlined',
            header: 'Confirm deletion',
            message: 'Are you sure you want to delete this record?',
            accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
              this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
            },
          });
        }
      }
    ];
  }

 

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':

    }
    return null;
  }
}
