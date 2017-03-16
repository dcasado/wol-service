import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingListComponent } from './ping-list.component';

describe('PingListComponent', () => {
  let component: PingListComponent;
  let fixture: ComponentFixture<PingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
