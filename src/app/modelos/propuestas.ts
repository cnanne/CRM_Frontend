export interface Propuesta {
    id: number;
    oportunidad: number;
    attachment: string | null;
    fecha_creacion: string;
    major_version: number;
    minor_version: number;
    nombre_propuesta: string;
    in_draft: boolean;
}