import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComercialComponent} from "./comercial.component";
import {SharedFrameModule} from "../shared-frame/shared-frame.module";
import {ComercialDashboardModule} from "./comercial-dashboard/comercial-dashboard.module";
import {ComercialClientesModule} from "./comercial-clientes/comercial-clientes.module";
import { DynamicContentAreaDirective } from '../shared-frame/dynamic-content-area.directive';




@NgModule({
  declarations: [ComercialComponent],
  imports: [
    CommonModule,
    SharedFrameModule,
    ComercialDashboardModule,
    ComercialClientesModule,
    DynamicContentAreaDirective
  ]
})
export class ComercialModule { }
