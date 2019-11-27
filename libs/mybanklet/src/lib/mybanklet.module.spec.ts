import { async, TestBed } from '@angular/core/testing';
import { MybankletModule } from './mybanklet.module';

describe('MybankletModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MybankletModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MybankletModule).toBeDefined();
  });
});
