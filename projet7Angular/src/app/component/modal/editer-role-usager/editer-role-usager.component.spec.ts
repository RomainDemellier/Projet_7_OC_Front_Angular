import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerRoleUsagerComponent } from './editer-role-usager.component';

describe('EditerRoleUsagerComponent', () => {
  let component: EditerRoleUsagerComponent;
  let fixture: ComponentFixture<EditerRoleUsagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerRoleUsagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerRoleUsagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
