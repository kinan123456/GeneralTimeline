import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryComponent } from './trajectory.component';

describe('TrajectoryComponent', () => {
  let component: TrajectoryComponent;
  let fixture: ComponentFixture<TrajectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
