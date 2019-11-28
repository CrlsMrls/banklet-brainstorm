import { Component, Injector, NgModuleFactoryLoader, Compiler, ViewChild, ViewEncapsulation } from '@angular/core';
import { BankletComponentCreator, CreateComponent } from '@banklet-api/core';

@Component({
  selector: 'banklet-api-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('ref', {static: true}) ref; 
  constructor(private c: BankletComponentCreator) {
    setTimeout(() => {
      c.create(import('@banklet-api/mybanklet2'), this.ref, {});
    });
  }
}

// TODO: make API less clunky 
