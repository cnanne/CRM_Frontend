import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComercialClientesComponent} from "./comercial-clientes.component";



@NgModule({
  declarations: [ComercialClientesComponent,],
  exports: [ComercialClientesComponent],
  imports: [
    CommonModule,



  ]
})
export class ComercialClientesModule { }
