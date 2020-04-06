import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminModalComponent } from './create-admin-modal.component';

describe('CreateAdminModalComponent', () => {
  let component: CreateAdminModalComponent;
  let fixture: ComponentFixture<CreateAdminModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
