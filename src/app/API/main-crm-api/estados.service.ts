import { Injectable } from '@angular/core';
import { BaseClassService } from './base-class.service';
import { Observable, map } from 'rxjs';
import { EstadoOportunidad } from '../../modelos/estadoOpp';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstadosService extends BaseClassService {

  constructor(private http: HttpClient) {
    super();
  }

  getEstados (): Observable<EstadoOportunidad[]>{
    return this.http.get(this.completePath("estados")).pipe(
      map((response: any) => response as EstadoOportunidad[])
    )
  }
}
