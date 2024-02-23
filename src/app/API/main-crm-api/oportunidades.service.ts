import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseClassService } from './base-class.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Oportunidad, OportunidadesListItem } from '../../modelos/oportunidades';

@Injectable({
  providedIn: 'root'
})
export class OportunidadesService extends BaseClassService {

  constructor(private http: HttpClient) { 
    
    super()
  }

  getOportunidadesList(): Observable<OportunidadesListItem[]>{
   return this.http.get(this.completePath('actividadesNextWeek')).pipe(
    map((response: any) => response as OportunidadesListItem[]) // Type assertion
    );
  }

  getOportunidad(id: string): Observable<Oportunidad>{
    return this.http.get(this.completePath(`oportunidades\\${id}`)).pipe(
      map((response: any) => response as Oportunidad)
    )
  }
  
}
