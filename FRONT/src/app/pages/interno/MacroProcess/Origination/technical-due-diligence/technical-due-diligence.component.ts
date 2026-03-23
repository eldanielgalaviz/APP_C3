import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { TddCbaComponent } from './tdd-cba/tdd-cba.component';
import { TddDocumentComponent } from './tdd-document/tdd-document.component';

@Component({
  selector: 'app-technical-due-diligence',
  imports: [SHARED_IMPORTS, TddCbaComponent, TddDocumentComponent],
  templateUrl: './technical-due-diligence.component.html',
  styleUrl: './technical-due-diligence.component.scss'
})
export class TechnicalDueDiligenceComponent {

}
