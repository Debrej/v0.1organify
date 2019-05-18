import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgasListComponent } from './orgas-list.component';

describe('OrgasListComponent', () => {
  let component: OrgasListComponent;
  let fixture: ComponentFixture<OrgasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
