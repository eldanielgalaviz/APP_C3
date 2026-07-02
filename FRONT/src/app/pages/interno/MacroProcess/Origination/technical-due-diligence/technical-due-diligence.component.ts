import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_NAVIGATION } from '../../../../../shared/imports';
import { TddCbaComponent } from './tdd-cba/tdd-cba.component';
import { TddDocumentComponent } from './tdd-document/tdd-document.component';

@Component({
  selector: 'app-technical-due-diligence',
  imports: [...CORE_IMPORTS, ...PRIMENG_NAVIGATION, TddCbaComponent, TddDocumentComponent],
  templateUrl: './technical-due-diligence.component.html',
})
export class TechnicalDueDiligenceComponent {

}
