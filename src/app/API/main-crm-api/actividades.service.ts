import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { ActividadesListItem, Actividad } from '../../modelos/actividades'
import { map } from 'rxjs/operators';
import { response } from 'express';
import { BaseClassService } from './base-class.service';
import { catchError } from 'rxjs/operators';
import path from 'path';

@Injectable()
export class ActividadesService extends BaseClassService {

  constructor( private http: HttpClient) { 
    super()
  }

  getActividades(): Observable<ActividadesListItem[]> {
    return this.http.get(this.completePath('actividades')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividad(id: string): Observable<Actividad>{
    var path = this.completePath(`actividades/${id}`)
    return this.http.get(path).pipe(
      map((response: any) => response as Actividad)
    );
  }

  completarActividad(jsonData: String, id: string): Observable<void>{
    let Comppath = this.completePath('actividades/completar/'+id)
    return this.http.put<void>(Comppath, jsonData).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle error here
        console.error('Error completing activity:', error);
        return throwError(()=>error)
      }))
  }

  moverActividad(jsonData: String, id: string): Observable<void>{
    return this.http.put<void>(this.completePath('actividades/mover/'+id), jsonData).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error moviendo actividad', error)
        return throwError(()=>error)
      })
    )
  }

  getActividadesHoy(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesHoy')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    ); 
  }

  getActividadesVencidas(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesVencidas')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividadesRestOfWeek(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesThisWeek')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividadesNextWeek(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesNextWeek')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividadesNext30Days(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesNext30')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividadesFuture(): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('actividadesFuture')).pipe(
      map((response: any) => response as ActividadesListItem[]) // Type assertion
    );
  }

  getActividadesPendientesFromOp(opp: string): Observable<ActividadesListItem[]>{
    return this.http.get(this.completePath('oportunidades/'+opp+'/actividadesPendientes')).pipe(
      map((response: any) => response as ActividadesListItem[])
    )
  }

}
