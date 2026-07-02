import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../../shared/imports';
import { Customer } from '../../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../../service/customerservice';
import { FormGroup, FormControl } from '@angular/forms';

interface City {
  name: string;
}
interface Status {
  name: string;
  styleClass: string;
}

@Component({
  selector: 'app-pl-new-activity',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  providers: [CustomerService],
  standalone: true,
  templateUrl: './pl-new-activity.component.html',
  styleUrl: './pl-new-activity.component.scss'
})
export class PlNewActivityComponent {

  cities: City[] | undefined;
  customers!: Customer[];
  status: Status[] | undefined;

  myForm = new FormGroup({
    a: new FormControl('')
  });


  constructor(private customerService: CustomerService) { }


  ngOnInit() {

    this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));

    this.cities = [
      { name: 'RP1' },
      { name: 'RP2' },
      { name: 'RP3' },
    ];

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
  }

}
