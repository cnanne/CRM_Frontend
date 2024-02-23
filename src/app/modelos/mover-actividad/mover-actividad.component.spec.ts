import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverActividadComponent } from './mover-actividad.component';

describe('MoverActividadComponent', () => {
  let component: MoverActividadComponent;
  let fixture: ComponentFixture<MoverActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoverActividadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoverActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
