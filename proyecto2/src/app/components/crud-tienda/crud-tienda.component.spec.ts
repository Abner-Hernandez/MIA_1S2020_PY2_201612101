import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTiendaComponent } from './crud-tienda.component';

describe('CrudTiendaComponent', () => {
  let component: CrudTiendaComponent;
  let fixture: ComponentFixture<CrudTiendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTiendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
