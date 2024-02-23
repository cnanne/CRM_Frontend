import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharedFrameDynamicComponent } from '../../shared-frame/shared-frame.component';
import { ActividadesService } from '../../API/main-crm-api/actividades.service'
import { ActividadesListItem } from '../../modelos/actividades';
import { forkJoin } from 'rxjs';
import { Actividad } from '../../modelos/actividades';

@Component({
  selector: 'app-comercial-dashboard',
  templateUrl: './comercial-dashboard.component.html',
  styleUrl: './comercial-dashboard.component.css',
  providers: [ActividadesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComercialDashboardComponent implements SharedFrameDynamicComponent {

  actividadesVencidas: ActividadesListItem[] = [];
  actividadesHoy: ActividadesListItem[] = [];
  completarActividadRendering = false;
  moverActividadRendering = false;
  verOppDetails = false;
  actividadId = '';
  actividad : Actividad = {}
  oppId = '';

  constructor (private cdr: ChangeDetectorRef, private actividadesService: ActividadesService){}

  ngOnInit() {
    forkJoin({
      actividadesVencidas: this.actividadesService.getActividadesVencidas(),
      actividadesHoy: this.actividadesService.getActividadesHoy()
    }).subscribe({
      next: (result) => {
        this.actividadesVencidas = result.actividadesVencidas as ActividadesListItem[];
        this.actividadesHoy = result.actividadesHoy as ActividadesListItem[];
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        // Handle error
      }
    });
  }

  completarActividad(actividad: ActividadesListItem) {
    this.closeAll();
    this.actividadId = actividad.id.toString()
    this.completarActividadRendering = true;
    
  }

  moverActividad(actividad: ActividadesListItem) {
    this.closeAll();
    this.actividadId = actividad.id.toString();
    this.moverActividadRendering = true;
  }

  verOpp(actividad: ActividadesListItem) {
    this.closeAll();
    this.oppId = actividad.oportunidad.id.toString();
      this.verOppDetails = true;
  }

  cerrarCompletarActividad(event: boolean) {
    this.completarActividadRendering = false;
  }

  cerrarMoverActividad(event: boolean) {
    this.moverActividadRendering = false;
  }

  cerrarVerOpp(event: boolean) {
    this.verOppDetails = false;
  }

  closeAll() {
    this.cerrarCompletarActividad(true);
    this.cerrarMoverActividad(true);
    this.cerrarVerOpp(true);
  }


}
