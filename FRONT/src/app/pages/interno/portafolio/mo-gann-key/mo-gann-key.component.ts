import { Component } from '@angular/core';
import { PRIMENG_FORM} from '../../../../shared/imports';

interface Rp {
  name: string;
}


@Component({
  selector: 'app-mo-gann-key',
  imports: [...PRIMENG_FORM],
  templateUrl: './mo-gann-key.component.html',
  styleUrl: './mo-gann-key.component.scss'
})
export class MoGannKeyComponent {


   ngOnInit() {



  }

}
