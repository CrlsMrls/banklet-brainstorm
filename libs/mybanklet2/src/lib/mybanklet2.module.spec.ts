import { async, TestBed } from '@angular/core/testing';
import { Mybanklet2Module } from './mybanklet2.module';

describe('Mybanklet2Module', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [Mybanklet2Module]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(Mybanklet2Module).toBeDefined();
  });
});
