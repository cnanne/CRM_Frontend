import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialActividadesComponent } from './comercial-actividades.component';

describe('ComercialActividadesComponent', () => {
  let component: ComercialActividadesComponent;
  let fixture: ComponentFixture<ComercialActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
