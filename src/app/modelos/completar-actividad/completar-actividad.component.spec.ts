import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarActividadComponent } from './completar-actividad.component';

describe('CompletarActividadComponent', () => {
  let component: CompletarActividadComponent;
  let fixture: ComponentFixture<CompletarActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletarActividadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
