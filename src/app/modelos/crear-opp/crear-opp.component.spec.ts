import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOppComponent } from './crear-opp.component';

describe('CrearOppComponent', () => {
  let component: CrearOppComponent;
  let fixture: ComponentFixture<CrearOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearOppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
