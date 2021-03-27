import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DortoratComponent } from './dortorat.component';

describe('DortoratComponent', () => {
  let component: DortoratComponent;
  let fixture: ComponentFixture<DortoratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DortoratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DortoratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
