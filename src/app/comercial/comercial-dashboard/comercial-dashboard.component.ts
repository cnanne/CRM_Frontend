import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SharedFrameDynamicComponent } from '../../shared-frame/shared-frame.component';
import { ActividadesService } from '../../API/main-crm-api/actividades.service';
import { ActividadesListItem } from '../../modelos/actividades';
import { forkJoin } from 'rxjs';
import { Actividad } from '../../modelos/actividades';
import { MatDialog } from '@angular/material/dialog';
import { CrearOppComponent } from '../../modelos/crear-opp/crear-opp.component';
import { CompletarActividadComponent } from '../../modelos/completar-actividad/completar-actividad.component';
import { MoverActividadComponent } from '../../modelos/mover-actividad/mover-actividad.component';
import { VerOppComponent } from '../../modelos/ver-opp/ver-opp.component';

@Component({
  selector: 'app-comercial-dashboard',
  templateUrl: './comercial-dashboard.component.html',
  styleUrls: ['./comercial-dashboard.component.css'],
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
  actividad: Actividad = {};
  oppId = '';

  constructor(private cdr: ChangeDetectorRef, private actividadesService: ActividadesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getActividades();
  }

  getActividades(): void {
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
    const dialogRef = this.dialog.open(CompletarActividadComponent, {
      width: '600px', // Adjust width as needed
      data: { actividadId: actividad.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getActividades();
    });
  }

  moverActividad(actividad: ActividadesListItem) {
    const dialogRef = this.dialog.open(MoverActividadComponent, {
      width: '600px', // Adjust width as needed
      data: { actividadId: actividad.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getActividades();
    });
  }

  verOpp(actividad: ActividadesListItem) {
    const dialogRef = this.dialog.open(VerOppComponent, {
      width: '600px', // Adjust width as needed
      data: { oppId: actividad.oportunidad.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getActividades();
    });
  }

  crearOpp() {
    const dialogRef = this.dialog.open(CrearOppComponent, {
      width: '600px', // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle any actions after the dialog is closed if needed
    });
  }
}
