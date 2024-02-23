import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComercialOportunidadesComponent} from "./comercial-oportunidades.component";



@NgModule({
  declarations: [ComercialOportunidadesComponent],
  exports: [ComercialOportunidadesComponent],
  imports: [
    CommonModule
  ]
})
export class ComercialOportunidadesModule { }
