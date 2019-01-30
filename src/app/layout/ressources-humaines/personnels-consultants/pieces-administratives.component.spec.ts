import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecesAdministrativesComponent } from './pieces-administratives.component';

describe('PiecesAdministrativesComponent', () => {
  let component: PiecesAdministrativesComponent;
  let fixture: ComponentFixture<PiecesAdministrativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiecesAdministrativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecesAdministrativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
