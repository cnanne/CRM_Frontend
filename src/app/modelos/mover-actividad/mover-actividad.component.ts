import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { Actividad, MoverActividad } from '../actividades';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { futureDateValidator, minCharacterLengthValidator } from '../../validators/fieldValidators'




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
      nuevaFecha: ['', [Validators.required, futureDateValidator()]],
      razon: ['', [Validators.required, minCharacterLengthValidator(20)]]
    });
  }

  moverActividad(): void {
    if (this.moverActividadForm && this.moverActividadForm.valid){
      const nuevaFecha = this.moverActividadForm.get('nuevaFecha')?.value
      const razon = this.moverActividadForm.get('razon')?.value
      if (razon != null && nuevaFecha != null){
        const moverActividad: MoverActividad ={
          id: this.actividadId,
          notas: razon.toString(),
          fecha_nueva: this.formatDate(new Date(nuevaFecha))
        }
        this.ejecutarMoverActividad(moverActividad)
      }
      else{
        this.moverActividadForm.markAllAsTouched();
      }    
    }
    else{
      this.moverActividadForm.markAllAsTouched();
    }
  }
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private ejecutarMoverActividad(actividad: MoverActividad){
   const moverActividadJSON: string = JSON.stringify(actividad);
   console.log(moverActividadJSON)
   this.actividades.moverActividad(moverActividadJSON, this.actividadId).subscribe(
    ((value: void) =>
      this.closeView()
    )
   )
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
