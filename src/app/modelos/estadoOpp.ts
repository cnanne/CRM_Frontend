

export interface EstadoMacro1 {
    id: number;
    nombre: string;
}

export interface EstadoMacro2 {
    id: number;
    nombre: string;
}

export interface EstadoOportuniadMin{
    id: number;
    nombre: string;
    valor: number;
}

export interface EstadoOportunidad {
    id: number;
    nombre: string;
    valor: number;
    macro_estado_1: EstadoMacro1 | null;
    macro_estado_2: EstadoMacro2 | null;
    cerrada: boolean;
    abierta: boolean;
}