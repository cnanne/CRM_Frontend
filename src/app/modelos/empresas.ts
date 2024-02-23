import { Industria } from "./common-data";
import { Departamento } from "./common-data";
import { Pais } from "./common-data";

export interface EmpresaNombre{
    id: number
    nombre_de_empresa: string
}

export interface Empresa {
    id: number;
    nombre_de_empresa: string;
    industria: Industria;
    grupo_empresarial: boolean;
    is_cliente: boolean;
    is_fabricante: boolean;
    is_competencia: boolean;
    departamento: Departamento | null;
    grupoEmpresarial: number | null;
    paises: Pais[];
}