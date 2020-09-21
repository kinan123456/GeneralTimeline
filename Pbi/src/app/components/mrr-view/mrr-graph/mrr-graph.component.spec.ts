import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrrGraphComponent } from './mrr-graph.component';

describe('MrrGraphComponent', () => {
  let component: MrrGraphComponent;
  let fixture: ComponentFixture<MrrGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrrGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrrGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
