import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { Actividad } from '../actividades';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';




@Component({
  selector: 'app-mover-actividad',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './mover-actividad.component.html',
  styleUrl: './mover-actividad.component.css',
  providers: [ActividadesService, provideNativeDateAdapter()]
  //Need to create a service to get the prioridades. (ALL OF THEM)
})
export class MoverActividadComponent implements OnChanges{

  moverActividadForm;
  actividad : Actividad = {}
  @Input() actividadId: string = ""
  @Output() closeMoverEvent = new EventEmitter<boolean>
  

  constructor( private actividades: ActividadesService, private formBuilder: FormBuilder  ){
    this.moverActividadForm = this.formBuilder.group({
      
      //understand better how the F the validators Work... won't use them for right now other than required
      nuevaFecha: ['', Validators.required],
      razon: ['', Validators.required]
    });
  }

  actividadCompletar(): void {
    if (this.moverActividadForm && this.moverActividadForm.valid){
      const nuevaFecha = this.moverActividadForm.get('nuevaFecha')?.value
      const razon = this.moverActividadForm.get('razon')?.value
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['actividadId'] && changes['actividadId'].currentValue) {
      if (this.actividadId != ""){
        this.fetchActividadInfo();
      }
    }
  }

  
  

  private fetchActividadInfo(){
    this.actividades.getActividad(this.actividadId).subscribe({
      next: (result) => {
        this.actividad = result
      },
      error: (error) => {
        console.error('Failed to get Actividad',  error)
      }
    })
  }

  closeView(){
    this.closeMoverEvent.emit(true)
  }
  

}
