import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { Actividad, CompletarActividad } from '../actividades';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { minCharacterLengthValidator } from '../../validators/fieldValidators';
import { PrioridadesService } from '../../API/main-crm-api/prioridades.service';
import { Prioridad } from '../prioridades';



@Component({
  selector: 'app-completar-actividad',
  standalone: true,
  imports: [
    
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  templateUrl: './completar-actividad.component.html',
  styleUrl: './completar-actividad.component.css',
  providers: [ provideNativeDateAdapter()
    ]
  //Need to create a service to get the prioridades. (ALL OF THEM)
})
export class CompletarActividadComponent implements OnChanges, OnInit {

  completarActividadForm
  actividad$ : Observable<Actividad> | null = null
  prioridades : Prioridad[]  = [{}]
  prioridadesFetched : boolean = false
  @Input() actividadId: string = ""
  @Output() closeCompletarEvent = new EventEmitter<boolean>
  
  
  
  constructor(private prioridadesService: PrioridadesService, private actividadesService : ActividadesService, private formBuilder: FormBuilder){
    this.completarActividadForm = this.formBuilder.group({
      
      //understand better how the F the validators Work... won't use them for right now other than required
      notas: ['', [Validators.required, minCharacterLengthValidator(10)]],
      fechaCompletada: [this.getCurrentDate(), Validators.required],
      nuevaFecha: ['', Validators.required],
      nuevaActividad: ['', [Validators.required, minCharacterLengthValidator(10)]],
      prioridad: ['', Validators.required],
    });
    this.fetchPrioridades()
  }

  actividadCompletar(): void {
    if (this.completarActividadForm && this.completarActividadForm.valid){
      const notas = this.completarActividadForm.get('notas')?.value;
      const nuevaFechaRaw = this.completarActividadForm.get('nuevaFecha')?.value;
      const fechaCompletadaRaw = this.completarActividadForm.get('fechaCompletada')?.value;
      if (nuevaFechaRaw && fechaCompletadaRaw) {
        const nuevaFecha = this.formatDate(new Date(nuevaFechaRaw)); // Format nuevaFecha
        const fechaCompletada = this.formatDate(new Date(fechaCompletadaRaw));
        const nuevaActividad = this.completarActividadForm.get('nuevaActividad')?.value;
        const prioridad = this.completarActividadForm.get('prioridad')?.value;

        if (notas != null && nuevaActividad != null && prioridad != null){
          const completarActividad: CompletarActividad = {
            id: +this.actividadId,
            notas: notas,
            nueva_actividad_curr_actividad: nuevaActividad,
            nueva_actividad_prioridad_nueva_actividad: prioridad,
            nueva_actividad_fecha_nueva_actividad: nuevaFecha,
            fecha_completada: fechaCompletada
          };
          // Convert to JSON string
          const completarActividadJSON: string = JSON.stringify(completarActividad);
          console.log(completarActividadJSON)
          this.actividadesService.completarActividad(completarActividadJSON, this.actividadId)
        }

        

      }else {
        this.completarActividadForm.markAllAsTouched();

      }
    }else {
      this.completarActividadForm.markAllAsTouched();
    }
  }

  fetchPrioridades(){
    this.prioridadesService.getPrioridades().subscribe(
      data => {
        this.prioridades = data
        this.prioridadesFetched = true
      }
    )
  }





  ngOnInit(): void {
    this.actividad$ = this.fetchActividadInfo()
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private fetchActividadInfo() : Observable<Actividad>{
     return this.actividadesService.getActividad(this.actividadId)
 
  }
  


  closeView(){
    this.closeCompletarEvent.emit(true)
  }
  
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
