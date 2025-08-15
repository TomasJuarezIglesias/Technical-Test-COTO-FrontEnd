import { ClienteDto } from "./cliente-dto";
import { SalonDto } from "./salon-dto";

export interface ReservaDto {
  id: number;
  fecha: Date;
  horaInicio: string;
  horaFin: string
  salon: SalonDto;
  cliente: ClienteDto;
}
