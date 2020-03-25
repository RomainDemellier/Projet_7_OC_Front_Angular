import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreCreationComponent } from './livre-creation.component';

describe('LivreCreationComponent', () => {
  let component: LivreCreationComponent;
  let fixture: ComponentFixture<LivreCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
