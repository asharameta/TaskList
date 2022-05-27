import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesComponent } from './priorities.component';

describe('PrioritiesComponent', () => {
  let component: PrioritiesComponent;
  let fixture: ComponentFixture<PrioritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
