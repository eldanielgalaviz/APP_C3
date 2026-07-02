import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA } from '../../../../../../../shared/imports';
import { CustomerService } from '../../../../../../../../service/customerservice';
import { City } from '../../../../../../../interfaces/tools/menu/menu.interface';
import { Customer } from '../../../../../../../../domain/customer';

@Component({
  selector: 'app-pl-view-plan-cronograma',
 imports: [...CORE_IMPORTS, ...PRIMENG_DATA],
  templateUrl: './pl-view-plan-cronograma.component.html',
  styleUrl: './pl-view-plan-cronograma.component.scss'
})
export class PlViewPlanCronogramaComponent {

  cities: City[] | undefined;
   customers!: Customer[];
  

  constructor(private customerService: CustomerService) { }


  ngOnInit() {

     this.customerService.getCustomersLarge().then((customers) => (this.customers = customers));
  
  }

}