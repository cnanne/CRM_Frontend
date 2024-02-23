import { EmpresaNombre, Empresa } from "./empresas";
import { Pais, Contacto } from "./common-data";
import { EstadoOportunidad } from "./estadoOpp";
import { RazonDeCierre } from "./razonesDeCierre";



export interface OportunidadYEmpresa{
    id: number;
    nombre_de_oportunidad: string;
    empresa: EmpresaNombre

}

export interface OportunidadesListItem{
    id: number
    nombre_de_oportunidad: string
    empresa: EmpresaNombre
    monto: number
    fecha_de_cierre: Date
    fecha_de_inicio: Date
    estado_de_la_oportunidad: EstadoOportunidad
}

export interface Oportunidad {
    id?: number;
    nombre_de_oportunidad?: string;
    forecast?: boolean;
    lip?: string | null;
    propuesta_presentada?: boolean;
    probabilidad_de_cierre?: number;
    empresa?: EmpresaNombre;
    fabricantes?: Empresa[];
    comercial?: number[];
    pais?: Pais;
    fecha_de_alta?: Date | null;
    fecha_de_inicio?: Date | null;
    fecha_de_cierre?: Date | null;
    estado_de_la_oportunidad?: EstadoOportunidad | null;
    razon_de_cierre?: RazonDeCierre | null;
    problema?: string | null;
    proyecto?: string | null;
    presupuesto?: string | null;
    plazo?: string | null;
    prioridad?: string | null;
    proceso_decisorio?: string | null;
    personas?: Contacto[];
    competencia?: Empresa[];
    monto?: number | null;
}