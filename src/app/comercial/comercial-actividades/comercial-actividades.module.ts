import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComercialActividadesComponent} from "./comercial-actividades.component";



@NgModule({
  declarations: [ComercialActividadesComponent],
  exports: [ComercialActividadesComponent],
  imports: [
    CommonModule
  ]
})
export class ComercialActividadesModule { }
