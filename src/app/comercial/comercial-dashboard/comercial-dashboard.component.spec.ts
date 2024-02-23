import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialDashboardComponent } from './comercial-dashboard.component';

describe('ComercialDashboardComponent', () => {
  let component: ComercialDashboardComponent;
  let fixture: ComponentFixture<ComercialDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
