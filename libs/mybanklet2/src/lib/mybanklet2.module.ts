import { NgModule, Component } from '@angular/core';
import { BankletModule } from '@banklet-api/core';


@Component({
  selector: 'my-banklet2',
  template: '<h4>hi from component 2</h4>'
})
export class MybankletComponent { }


@NgModule({
  declarations: [MybankletComponent],
  imports: [BankletModule.configureBankletComponent({
    component: MybankletComponent,
    params: {
      id: 'number'
    }
    // add config schema
  } as any)]
})
export class MybankletModule { }
