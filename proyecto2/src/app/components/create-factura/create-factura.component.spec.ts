import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFacturaComponent } from './create-factura.component';

describe('CreateFacturaComponent', () => {
  let component: CreateFacturaComponent;
  let fixture: ComponentFixture<CreateFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
