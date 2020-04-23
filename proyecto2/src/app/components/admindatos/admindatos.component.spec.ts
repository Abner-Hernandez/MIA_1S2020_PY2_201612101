import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindatosComponent } from './admindatos.component';

describe('AdmindatosComponent', () => {
  let component: AdmindatosComponent;
  let fixture: ComponentFixture<AdmindatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmindatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
