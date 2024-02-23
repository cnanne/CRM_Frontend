import { Empresa } from "./empresas";
export interface Departamento {
    id: number;
    nombre: string;
    departamento_padre: number | null;
}

export interface Industria {
    id: number;
    nombre: string;
}

export interface Pais {
    id: number;
    nombre: string;
    iva: number;
    tipo_de_cambio: number;
}

export interface Contacto {
    id: number;
    nombre: string;
    apellido: string | null;
    titulo: string | null;
    numero: string | null;
    email: string | null;
    empresa: Empresa;
}