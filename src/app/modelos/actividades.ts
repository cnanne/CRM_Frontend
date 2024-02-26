import { NumberValueAccessor } from "@angular/forms";
import { OportunidadEmpresaYEstado, OportunidadYEmpresa } from "./oportunidades";
import { Prioridad } from "./prioridades";

export interface ActividadesListItem {
    id: number;
    oportunidad: OportunidadYEmpresa;
    fecha_actividad: Date;
    curr_actividad: string;
    prioridad: Prioridad;
    notas: string;
    }

export interface Actividad{
    id?: number
    oportunidad?: OportunidadEmpresaYEstado
    fecha_actividad?: Date;
    curr_actividad?: string;
    prioridad?: Prioridad;
    notas?: string;
    fecha_creada?: Date;
    fecha_completada?: Date;
    fecha_completada_crm?: Date;
    se_movio?: boolean
    move_count?: number
    completada?: boolean
    fecha_nueva?: Date;
    from_registro?: Actividad
    user_owner?: number
}

export interface CompletarActividad{
    id?: number
    notas?: string
    fecha_completada?: string
    nueva_actividad_curr_actividad?: string
    nueva_actividad_fecha_nueva_actividad?: string
    nueva_actividad_prioridad_nueva_actividad?: string
    agregar_nueva_actividad: boolean
}




