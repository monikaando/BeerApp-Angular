import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweriesDetailsComponent } from './breweries-details.component';

describe('BreweriesDetailsComponent', () => {
  let component: BreweriesDetailsComponent;
  let fixture: ComponentFixture<BreweriesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweriesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
