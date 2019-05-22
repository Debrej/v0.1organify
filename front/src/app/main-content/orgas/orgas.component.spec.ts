import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgasComponent } from './orgas.component';

describe('OrgasComponent', () => {
  let component: OrgasComponent;
  let fixture: ComponentFixture<OrgasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
