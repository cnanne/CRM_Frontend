import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Actividad, CompletarActividad } from '../actividades';
import { Observable, Subject, takeUntil, catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { minCharacterLengthValidator, todayOrFutureDateValidator, todayOrBeforeValidator } from '../../validators/fieldValidators';
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
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './completar-actividad.component.html',
  styleUrl: './completar-actividad.component.css',
  providers: [ provideNativeDateAdapter()
    ]
  //Need to create a service to get the prioridades. (ALL OF THEM)
})
export class CompletarActividadComponent implements OnChanges, OnInit, OnDestroy {

  completarActividadForm
  actividad$ : Observable<Actividad> | null = null
  actividad: Actividad = {}
  prioridades : Prioridad[]  = [{}]
  prioridadesFetched : boolean = false
  @Input() actividadId: string = ""
  @Output() closeCompletarEvent = new EventEmitter<boolean>
  oportunidadCerrada: boolean = true
  actividadFetched: boolean = false
  agregarNuevaOpp: boolean = true
  private destroy$: Subject<void> = new Subject<void>();
  
  
  
  
  constructor(private cdr: ChangeDetectorRef, private prioridadesService: PrioridadesService, private actividadesService : ActividadesService, private formBuilder: FormBuilder){
    this.completarActividadForm = this.formBuilder.group({
      
      //understand better how the F the validators Work... won't use them for right now other than required
      notas: ['', [Validators.required, minCharacterLengthValidator(10)]],
      fechaCompletada: [this.getCurrentDate(), [Validators.required,todayOrBeforeValidator()]],
      nuevaFecha: ['', [Validators.required,todayOrFutureDateValidator()]],
      nuevaActividad: ['', [Validators.required, minCharacterLengthValidator(10)]],
      prioridad: ['', Validators.required],
      agregarNuevaActividad: [this.agregarNuevaOpp]
    });
    this.fetchPrioridades()
  }

  agregarNuevaOportunidadToggle(event: MatSlideToggleChange){
    if (event.checked){
      this.setValidatorsForNewActividad()
      this.agregarNuevaOpp = true
    }
    else {
      this.removeValidatorsFromNewActividad()
      this.agregarNuevaOpp = false
    }
  }

  setValidatorsForNewActividad(){
    // Set validators for the 'nuevaFecha' control
    this.completarActividadForm.get('nuevaFecha')?.setValidators(Validators.required);
    this.completarActividadForm.get('nuevaFecha')?.updateValueAndValidity();

    // Set validators for the 'nuevaActividad' control
    this.completarActividadForm.get('nuevaActividad')?.setValidators([Validators.required, minCharacterLengthValidator(10)]);
    this.completarActividadForm.get('nuevaActividad')?.updateValueAndValidity();

    // Set validators for the 'prioridad' control
    this.completarActividadForm.get('prioridad')?.setValidators(Validators.required);
    this.completarActividadForm.get('prioridad')?.updateValueAndValidity();
  }

  removeValidatorsFromNewActividad(){
    // Remove validators from the 'nuevaFecha' control
    this.completarActividadForm.get('nuevaFecha')?.clearValidators();
    this.completarActividadForm.get('nuevaFecha')?.updateValueAndValidity();

    // Remove validators from the 'nuevaActividad' control
    this.completarActividadForm.get('nuevaActividad')?.clearValidators();
    this.completarActividadForm.get('nuevaActividad')?.updateValueAndValidity();

    // Remove validators from the 'prioridad' control
    this.completarActividadForm.get('prioridad')?.clearValidators();
    this.completarActividadForm.get('prioridad')?.updateValueAndValidity();
  }

  actividadCompletar(): void {
    if (this.completarActividadForm && this.completarActividadForm.valid){
      const notas = this.completarActividadForm.get('notas')?.value;
      const nuevaFechaRaw = this.completarActividadForm.get('nuevaFecha')?.value;
      const fechaCompletadaRaw = this.completarActividadForm.get('fechaCompletada')?.value;
      if (fechaCompletadaRaw) {
        const fechaCompletada = this.formatDate(new Date(fechaCompletadaRaw));
        const nuevaActividad = this.completarActividadForm.get('nuevaActividad')?.value;
        const prioridad = this.completarActividadForm.get('prioridad')?.value;

        if(this.agregarNuevaOpp){
          if (notas != null && nuevaActividad != null && prioridad != null){
            if (nuevaFechaRaw){
            const nuevaFecha = this.formatDate(new Date(nuevaFechaRaw)); // Format nuevaFecha

            const completarActividad: CompletarActividad = {
              id: +this.actividadId,
              notas: notas,
              nueva_actividad_curr_actividad: nuevaActividad,
              nueva_actividad_prioridad_nueva_actividad: prioridad,
              nueva_actividad_fecha_nueva_actividad: nuevaFecha,
              fecha_completada: fechaCompletada,
              agregar_nueva_actividad: this.agregarNuevaOpp
            };
            this.convertToJsonAndSend(completarActividad)

          }}
            
        }else{
          if(notas != null){
            const completarActividad: CompletarActividad = {
              id: +this.actividadId,
              notas: notas,
              fecha_completada: fechaCompletada,
              agregar_nueva_actividad: this.agregarNuevaOpp,
              nueva_actividad_curr_actividad: "Blank",
              nueva_actividad_prioridad_nueva_actividad: "1",
              nueva_actividad_fecha_nueva_actividad: "2024-12-12",
            };
            this.convertToJsonAndSend(completarActividad)
          }
          
        }


        

      }else {
        this.completarActividadForm.markAllAsTouched();

      }
    }else {
      this.completarActividadForm.markAllAsTouched();
    }
  }
  convertToJsonAndSend(actividad : CompletarActividad){
              // Convert to JSON string

    const completarActividadJSON: string = JSON.stringify(actividad);
    this.actividadesService.completarActividad(completarActividadJSON, this.actividadId).subscribe(
      ((value: void) =>
        this.closeView()
      )
    )
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
    this.fetchActividadInfo()
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  private fetchActividadInfo(): void {
    this.actividadesService.getActividad(this.actividadId).pipe(
      takeUntil(this.destroy$), // Unsubscribe when component destroyed
      catchError(error => {
        console.error('ERROR FETCHING ACTIVIDAD', error);
        return []; // Handle error, return empty array or suitable default value
      }),
      finalize(() => {
        // Finalize logic, runs when observable completes or errors
      })
    ).subscribe((next: Actividad) => {
      this.actividad = next;
      this.actividadFetched = true;
      
      let terminada = this.actividad.oportunidad?.estado_de_la_oportunidad.cerrada;
      if ( terminada ) {
        this.oportunidadCerrada = true;
        this.agregarNuevaOpp = false;
        this.completarActividadForm.patchValue({
          agregarNuevaActividad: this.agregarNuevaOpp
        })
        this.removeValidatorsFromNewActividad()
      }
      this.cdr.detectChanges(); // Force change detection
    });
  }
  


  closeView(){
    this.closeCompletarEvent.emit(true)
  }
  
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = (today.getDate()).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
