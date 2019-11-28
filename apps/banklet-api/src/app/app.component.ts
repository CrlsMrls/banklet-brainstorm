import { Component, ViewChild, OnInit, ViewEncapsulation } from '@angular/core';
import { BankletComponentCreator } from '@banklet-api/core';

@Component({
  selector: 'banklet-api-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('ref', { static: true }) ref;

  constructor(private bankletComponentCreator: BankletComponentCreator) {}

  async ngOnInit() {
    this.bankletComponentCreator.createComponentFactory(import('@banklet-api/mybanklet2'))
      .then(componentFactory => componentFactory.create(this.ref, {}));
  }
}
