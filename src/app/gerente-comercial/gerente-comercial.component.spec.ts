import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteComercialComponent } from './gerente-comercial.component';

describe('GerenteComercialComponent', () => {
  let component: GerenteComercialComponent;
  let fixture: ComponentFixture<GerenteComercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteComercialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenteComercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
