import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialClientesComponent } from './comercial-clientes.component';

describe('ComercialClientesComponent', () => {
  let component: ComercialClientesComponent;
  let fixture: ComponentFixture<ComercialClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialClientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
