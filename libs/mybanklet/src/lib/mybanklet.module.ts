import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BankletModule } from '@banklet-api/core';

@Component({
  selector: 'view1-1',
  template: `
    <div class="banklet">
      <h4>Banklet 1 - First view</h4>
      <a routerLink="../second"> Goto 2nd </a>
    </div>
    `
  })
  export class MybankletComponent {}
  
  @Component({
    selector: 'view1-2',
    template: `
      <div class="banklet">
        <h4>Banklet 1 - Second view</h4>
        <a routerLink="../first"> Goto 1st </a>
      </div>
    `
})
export class SecondViewComponent {}

@NgModule({
  declarations: [MybankletComponent, SecondViewComponent],
  imports: [
    RouterModule,
    BankletModule.configureBankletRoutes({
      routes: [
        {
          path: 'first',
          component: MybankletComponent
        },
        {
          path: 'second',
          component: SecondViewComponent
        }
      ],
      params: {
        id: 'number'
      }
      // add config schema
    })
  ]
})
export class MybankletModule {}
