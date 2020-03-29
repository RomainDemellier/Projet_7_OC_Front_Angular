import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsagerEditerRoleComponent } from './usager-editer-role.component';

describe('UsagerEditerRoleComponent', () => {
  let component: UsagerEditerRoleComponent;
  let fixture: ComponentFixture<UsagerEditerRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsagerEditerRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsagerEditerRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
