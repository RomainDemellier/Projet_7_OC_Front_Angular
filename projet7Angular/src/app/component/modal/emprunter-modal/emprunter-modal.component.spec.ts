import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprunterModalComponent } from './emprunter-modal.component';

describe('EmprunterModalComponent', () => {
  let component: EmprunterModalComponent;
  let fixture: ComponentFixture<EmprunterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmprunterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmprunterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
