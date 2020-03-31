import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUsagersComponent } from './liste-usagers.component';

describe('ListeUsagersComponent', () => {
  let component: ListeUsagersComponent;
  let fixture: ComponentFixture<ListeUsagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeUsagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUsagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
