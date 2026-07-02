import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA } from '../../../../../../../../shared/imports';
import { Customer } from '../../../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../../../service/customerservice';
import { City } from '../../../../../../../../interfaces/tools/menu/menu.interface';

@Component({
  selector: 'app-pl-view-activity',
   imports: [...CORE_IMPORTS, ...PRIMENG_DATA],
  templateUrl: './pl-view-activity.component.html',
  styleUrl: './pl-view-activity.component.scss'
})
export class PlViewActivityComponent {

 cities: City[] | undefined;
   customers!: Customer[];
  

  constructor(private customerService: CustomerService) { }


  ngOnInit() {

     this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
  
  }
}
