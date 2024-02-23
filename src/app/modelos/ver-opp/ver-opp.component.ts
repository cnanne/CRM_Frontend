import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { Actividad } from '../actividades';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Oportunidad } from '../oportunidades';
import { OportunidadesService } from '../../API/main-crm-api/oportunidades.service';
import { error } from 'console';

@Component({
  selector: 'app-ver-opp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './ver-opp.component.html',
  styleUrl: './ver-opp.component.css'
})
export class VerOppComponent implements OnChanges{

  oppForm;
  oportunidad : Oportunidad = {}
  @Input() oppId: string = ""
  @Output() closeOppEvent = new EventEmitter<boolean>

  constructor(private oportunidades: OportunidadesService, private formBuilder: FormBuilder, ){
    this.oppForm = this.formBuilder.group({
      //Need to add al the fields here so we get something very nice from Oportunidad in the form.
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oppId'] && changes['oppId'].currentValue){
      if (this.oppId != ""){
        this.getOportunidadInfo()
      }
    }
  }

  getOportunidadInfo(){
    this.oportunidades.getOportunidad(this.oppId).subscribe({
      next: (result) => {
        this.oportunidad = result
      },
      error: (error) => {
        console.error('Failed to get Oportunidad', error)
      }
      
    })
  }

  closeAndSaveOportunidad(): void {
    this.saveOportunidad()
    this.closeOppEvent.emit(true)
  }

  saveOportunidad(): void {
    if (this.oppForm && this.oppForm.valid){
      //Logic to save form
    }
  }

  closeOportunidad(): void{
    //Add warining in case the form is dirty (figure this out)
    this.closeOppEvent.emit(true)
  }

}
