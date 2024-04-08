import { ChangeDetectorRef, Component, OnChanges, Input, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { Actividad, ActividadesListItem } from '../actividades';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Oportunidad } from '../oportunidades';
import { OportunidadesService } from '../../API/main-crm-api/oportunidades.service';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { EstadoOportunidad } from '../estadoOpp';
import { EstadosService } from '../../API/main-crm-api/estados.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
@Component({
  selector: 'app-ver-opp',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSliderModule,
    MatRadioModule,
    MatChipsModule,
    MatTabsModule,    
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './ver-opp.component.html',
  styleUrl: './ver-opp.component.css'
})
export class VerOppComponent implements OnChanges, OnInit{

  oppForm;
  oportunidad : Oportunidad = {}
  @Input() oppId: string = ""
  @Output() closeOppEvent = new EventEmitter<boolean>
  oportunidadFetched : boolean = false
  actividades: ActividadesListItem[] = []
  actividadesFetched :boolean = false
  estados: EstadoOportunidad[] = []
  estadosFetched: boolean = false

  constructor(private cdr: ChangeDetectorRef, 
    private oportunidades: OportunidadesService, 
    private formBuilder: FormBuilder,  
    private actividadesService: ActividadesService,
    private estadosService: EstadosService){
    this.oppForm = this.formBuilder.group({
      //Need to add al the fields here so we get something very nice from Oportunidad in the form.
      forecast: [],
      lip: [],
      propuesta_presentada: [],
      probabilidad_de_cierre: [],
      fabricantes: [],
      comercial: [],
      estado_de_la_oportunidad: [],
      razon_de_cierre: [],
      problema: [],
      proyecto: [],
      presupuesto: [],
      plazo: [],
      prioridad: [],
      proceso_decisorio: [],
      personas: [],
      competencia: [],
      monto: []
    })
  }

  isOpCerrada() :boolean{
    if (this.oportunidad.estado_de_la_oportunidad?.cerrada)
      return true
    else 
      return false
  }

  getEstadoColor() :string{
    const estado : string | undefined = this.oportunidad.estado_de_la_oportunidad?.macro_estado_2?.nombre
     if (estado != undefined){ 
      return estado
    }
    else return "abierta"
  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['oppId'] && changes['oppId'].currentValue){
      if (this.oppId != ""){
        this.getOportunidadInfo()
      }
    }
  }

  ngOnInit(): void {
      if(this.oppId != ""){
        this.getOportunidadInfo()
        this.getActividades()
        this.getEstados()
      }

  }

  getEstados(){
    this.estadosService.getEstados().subscribe({
      next:(result)=>{
        this.estados = result
        this.estadosFetched = true
        this.cdr.detectChanges()
      }
    })
  }



  isEstadoDisabled(estado: EstadoOportunidad) :boolean{  
    if (this.oportunidad.estado_de_la_oportunidad != undefined){  
      if (this.oportunidad.estado_de_la_oportunidad?.valor < estado.valor){
        if (estado.valor < 0){
          return false
        }
        else{
          return true
        }
      }else{
        return false
      }
    }else{
      return true
    }
  }

  isEstadoActual(estado: string) : boolean{
    if(this.oportunidad.estado_de_la_oportunidad != undefined)
      return this.oportunidad.estado_de_la_oportunidad.nombre == estado
     
    return false
  }
  

  getEstadoMacro2() : string | undefined{
    let estado2 :string|undefined= this.oportunidad.estado_de_la_oportunidad?.macro_estado_2?.nombre
    return estado2
  }

  getOportunidadInfo(){
    this.oportunidades.getOportunidad(this.oppId).subscribe({
      next: (result) => {
        this.oportunidad = result
        this.oportunidadFetched = true
        this.cdr.detectChanges()
      },
      error: (error) => {
        console.error('Failed to get Oportunidad', error)
      }
      
    })

  }

  getActividades(){
    this.actividadesService.getActividadesPendientesFromOp(this.oppId).subscribe({
      next: (result) => {
        this.actividades = result
        this.actividadesFetched = true
        this.cdr.detectChanges()
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
