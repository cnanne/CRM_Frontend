import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './auth.interceptor';


//configuraciones de la aplicacion, aca se proveen los providers
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi(), withFetch()), { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, 
    provideRouter(routes), provideClientHydration(), provideAnimations(), provideAnimations()]
};
