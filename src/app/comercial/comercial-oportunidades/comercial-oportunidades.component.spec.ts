import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialOportunidadesComponent } from './comercial-oportunidades.component';

describe('ComercialOportunidadesComponent', () => {
  let component: ComercialOportunidadesComponent;
  let fixture: ComponentFixture<ComercialOportunidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialOportunidadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialOportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
