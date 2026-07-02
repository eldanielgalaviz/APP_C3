import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../../shared/imports';
import { Customer } from '../../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../../service/customerservice';

interface City {
  name: string;
}


@Component({
  selector: 'app-report-activity',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  standalone: true,
  templateUrl: './report-activity.component.html',
  styleUrl: './report-activity.component.scss'
})
export class ReportActivityComponent {
cities: City[] | undefined;
  customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

     this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
     
    this.cities = [
      { name: 'RP1' },
      { name: 'RP2' },
      { name: 'RP3' },
    ];
    
    
  }

}

