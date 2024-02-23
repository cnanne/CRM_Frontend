import { Component } from '@angular/core';
import { RouterOutlet} from "@angular/router";
import {SharedFrameModule} from "./shared-frame/shared-frame.module";
import {ComercialModule} from "./comercial/comercial.module";
import {ComercialDashboardModule} from "./comercial/comercial-dashboard/comercial-dashboard.module";
import {ComercialClientesModule} from "./comercial/comercial-clientes/comercial-clientes.module";
import {ComercialOportunidadesModule} from "./comercial/comercial-oportunidades/comercial-oportunidades.module";
import {ComercialActividadesModule} from "./comercial/comercial-actividades/comercial-actividades.module";
import { DynamicContentAreaDirective } from './shared-frame/dynamic-content-area.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { UserLoginModule } from './user-login/user-login.module';
import { AuthInterceptor } from './auth.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    SharedFrameModule,
    RouterOutlet,
    ComercialModule,
    ComercialDashboardModule,
    ComercialClientesModule,
    ComercialOportunidadesModule,
    ComercialActividadesModule,
    DynamicContentAreaDirective,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    UserLoginModule,
    MatSelectModule
  ],
  providers:[{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  standalone: true,
})
export class AppComponent {
  title = 'SISAP CRM';

  
}
