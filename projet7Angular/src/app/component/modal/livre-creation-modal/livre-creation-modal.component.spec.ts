import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreCreationModalComponent } from './livre-creation-modal.component';

describe('LivreCreationModalComponent', () => {
  let component: LivreCreationModalComponent;
  let fixture: ComponentFixture<LivreCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
