import {
  Component,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  Type,
  ChangeDetectorRef
} from '@angular/core';
import { DynamicContentAreaDirective } from '../shared-frame/dynamic-content-area.directive';
import { ComercialDashboardComponent } from './comercial-dashboard/comercial-dashboard.component';
import { SharedFrameDynamicComponent } from '../shared-frame/shared-frame.component';
import { ComercialClientesComponent } from './comercial-clientes/comercial-clientes.component';
import { ComercialOportunidadesComponent } from './comercial-oportunidades/comercial-oportunidades.component';
import { ComercialActividadesComponent } from './comercial-actividades/comercial-actividades.component';
import { DynamicSection } from '../dynamic-section/dynamic-section.compnent'

@Component({
  selector: 'app-comercial',
  templateUrl: './comercial.component.html',
  styleUrls: ['./comercial.component.css']
})
export class ComercialComponent extends DynamicSection  {

  

  constructor(viewContainerRef: ViewContainerRef, cdr: ChangeDetectorRef) {
    super(viewContainerRef, cdr)
    this.menuItems = [
      { name: "Dashboard",icon: "Dashboard", iconPath: "assets/Icons/Dashboard.png", type: ComercialDashboardComponent },
      { name: "Clientes", icon: "People", iconPath: "assets/Icons/People.png", type: ComercialClientesComponent },
      { name: "Oportunidades", icon: "Opps", iconPath: "assets/Icons/Opps.png", type: ComercialOportunidadesComponent },
      { name: "Actividades", icon: "Activities", iconPath: "assets/Icons/Activities.png", type: ComercialActividadesComponent }
    ];
  }


}
