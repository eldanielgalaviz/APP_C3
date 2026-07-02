import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA, PRIMENG_FORM } from '../../../../shared/imports';

@Component({
  selector: 'app-mo-project-status',
 imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA],
  templateUrl: './mo-project-status.component.html',
  styleUrl: './mo-project-status.component.scss'
})
export class MoProjectStatusComponent {

  state: any[] | undefined;
  
}
