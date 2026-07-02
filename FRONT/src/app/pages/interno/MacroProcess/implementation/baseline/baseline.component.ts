import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA } from '../../../../../shared/imports';

@Component({
  selector: 'app-baseline',
  imports: [...CORE_IMPORTS, ...PRIMENG_DATA],
  templateUrl: './baseline.component.html',
  styleUrl: './baseline.component.scss'
})
export class BaselineComponent {

}
