import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA } from '../../../../../shared/imports';

@Component({
  selector: 'app-listing',
  imports: [...CORE_IMPORTS, ...PRIMENG_DATA],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent {

}
