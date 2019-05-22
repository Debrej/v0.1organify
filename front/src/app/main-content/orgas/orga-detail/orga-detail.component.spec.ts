import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaDetailComponent } from './orga-detail.component';

describe('OrgaDetailComponent', () => {
  let component: OrgaDetailComponent;
  let fixture: ComponentFixture<OrgaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
