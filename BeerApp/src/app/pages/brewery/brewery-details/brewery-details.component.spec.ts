import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryDetailsComponent} from './brewery-details.component';

describe('BreweryDetailsComponent', () => {
  let component: BreweryDetailsComponent;
  let fixture: ComponentFixture<BreweryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
