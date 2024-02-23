import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComercialDashboardComponent} from "./comercial-dashboard.component";
import { CompletarActividadComponent } from '../../modelos/completar-actividad/completar-actividad.component';
import { MoverActividadComponent } from '../../modelos/mover-actividad/mover-actividad.component';
import { MatButtonModule } from '@angular/material/button';
import { VerOppComponent } from '../../modelos/ver-opp/ver-opp.component';




@NgModule({
  declarations: [ComercialDashboardComponent],
  exports: [
    ComercialDashboardComponent
  ],
  imports: [
    CommonModule,
    CompletarActividadComponent,
    MoverActividadComponent,
    MatButtonModule,
    VerOppComponent,
  
  ],
  providers: []
})
export class ComercialDashboardModule { }
