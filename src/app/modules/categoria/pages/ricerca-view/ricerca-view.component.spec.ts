import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicercaViewComponent } from './ricerca-view.component';

describe('RicercaViewComponent', () => {
  let component: RicercaViewComponent;
  let fixture: ComponentFixture<RicercaViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicercaViewComponent]
    });
    fixture = TestBed.createComponent(RicercaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
