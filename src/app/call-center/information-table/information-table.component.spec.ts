import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTableComponent } from './information-table.component';

describe('RequestTableComponent', () => {
  let component: InformationTableComponent;
  let fixture: ComponentFixture<InformationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
