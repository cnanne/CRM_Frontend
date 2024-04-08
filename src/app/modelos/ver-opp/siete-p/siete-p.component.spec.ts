import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SietePComponent } from './siete-p.component';

describe('SietePComponent', () => {
  let component: SietePComponent;
  let fixture: ComponentFixture<SietePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SietePComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SietePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
