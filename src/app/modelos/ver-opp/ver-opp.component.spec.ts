import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerOppComponent } from './ver-opp.component';

describe('VerOppComponent', () => {
  let component: VerOppComponent;
  let fixture: ComponentFixture<VerOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerOppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
