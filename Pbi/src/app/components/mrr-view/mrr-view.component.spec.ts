import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MrrViewComponent } from './mrr-view.component';

describe('MrrViewComponent', () => {
  let component: MrrViewComponent;
  let fixture: ComponentFixture<MrrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
