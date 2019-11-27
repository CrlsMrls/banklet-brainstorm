import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {BankletComponentCreator} from '@banklet-api/core';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([{
      path: 'banklet',
      loadChildren: () => import('@banklet-api/mybanklet').then(m => m.MybankletModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/banklet'
}
  ])],
  providers: [BankletComponentCreator],
  bootstrap: [AppComponent]
})
export class AppModule {}
