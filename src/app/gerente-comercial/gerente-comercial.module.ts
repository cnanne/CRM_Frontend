import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GerenteComercialComponent} from "./gerente-comercial.component";
import {SharedFrameModule} from "../shared-frame/shared-frame.module";



@NgModule({
  declarations: [GerenteComercialComponent],
  imports: [
    CommonModule,
    SharedFrameModule
  ]
})
export class GerenteComercialModule { }
