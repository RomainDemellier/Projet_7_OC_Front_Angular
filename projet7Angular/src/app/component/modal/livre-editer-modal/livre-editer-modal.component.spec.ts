import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreEditerModalComponent } from './livre-editer-modal.component';

describe('LivreEditerModalComponent', () => {
  let component: LivreEditerModalComponent;
  let fixture: ComponentFixture<LivreEditerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreEditerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreEditerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
