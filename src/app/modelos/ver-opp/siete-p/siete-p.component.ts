import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Oportunidad } from '../../oportunidades';
import { SieteP } from '../../siete-p';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';


@Component({
  selector: 'app-siete-p',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,],
  templateUrl: './siete-p.component.html',
  styleUrl: './siete-p.component.css',
  
})
export class SietePComponent {

  sietePForm: FormGroup ;
    @Input() sieteP : SieteP = {} 
  @Input() 
  @Output() exitTab = new EventEmitter<SieteP>
  @ViewChild(MatTabGroup) tabGroup?: MatTabGroup
  

  

  tabClosed() {
    
  }


  constructor(private formBuilder: FormBuilder) {
    this.sietePForm = this.formBuilder.group({
      problema: [this.sieteP.problema || ''],
      proyecto: [this.sieteP.proyecto || ''],
      presupuesto: [this.sieteP.presupuesto || ''],
      prioridad: [this.sieteP.prioridad || ''],
      personas: [this.sieteP.personas || ''],
      procesoDecisorio: [this.sieteP.procesoDecisorio || ''],
      plazo: [this.sieteP.plazo || ''],
      competencia: [this.sieteP.competencia || '']
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.sietePForm = this.formBuilder.group({
      problema: [this.sieteP.problema || ''],
      proyecto: [this.sieteP.proyecto || ''],
      presupuesto: [this.sieteP.presupuesto || ''],
      prioridad: [this.sieteP.prioridad || ''],
      personas: [this.sieteP.personas || ''],
      procesoDecisorio: [this.sieteP.procesoDecisorio || ''],
      plazo: [this.sieteP.plazo || ''],
      competencia: [this.sieteP.competencia || '']
    });
  }

  convertFormToInterface() {
      const formValues = this.sietePForm.value;
      this.sieteP = {
        problema: formValues.problema || '',
        proyecto: formValues.proyecto || '',
        presupuesto: formValues.presupuesto || '',
        prioridad: formValues.prioridad || '',
        personas: formValues.personas?.toString() || '',
        procesoDecisorio: formValues.procesoDecisorio || '',
        plazo: formValues.plazo || '',
        competencia: formValues.competencia?.toString() || ''
      };
    }

  


    
    
    
    
    
    

  }


