import { Contacto } from "./common-data"
import { Empresa } from "./empresas"

export interface SieteP {

    problema? :string
    proyecto? :string
    presupuesto? :string
    prioridad? :string
    personas? : Contacto[]
    procesoDecisorio? :string
    plazo? :string
    competencia?: Empresa[]}
