import { Component, ViewChild, OnInit } from '@angular/core';
import { BankletComponentCreator } from '@banklet-api/core';

@Component({
  selector: 'banklet-api-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('ref', { static: true }) ref;

  constructor(private bankletComponentCreator: BankletComponentCreator) {
  }

  ngOnInit() {
    this.bankletComponentCreator.createComponentFactory(import('@banklet-api/mybanklet2'))
      .then(componentFactory => componentFactory.create(this.ref, {}));
  }
}

// TODO: make API less clunky 
