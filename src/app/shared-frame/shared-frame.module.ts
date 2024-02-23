import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";


// Agregar aca los componentes que tienen en comun el frame de la aplicacion.
// Headers, footers, etc...
@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedFrameModule { }
