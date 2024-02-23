import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseClassService } from './base-class.service';
import { Observable, map } from 'rxjs';
import { Prioridad } from '../../modelos/prioridades';

@Injectable({
  providedIn: 'root'
})
export class PrioridadesService extends BaseClassService{

  constructor(private http: HttpClient) {
    super()
   }

  getPrioridades() :Observable<Prioridad[]>{
    return this.http.get(this.completePath('prioridades')).pipe(
      map((response: any) => response as Prioridad[]) // Type assertion
      );
  }
}
