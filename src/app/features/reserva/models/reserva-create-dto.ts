export class ReservaCreateDto {
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  salonId: number;
  clienteId: number;

  constructor(
    fecha: Date,
    horaInicio: string,
    horaFin: string,
    salonId: number,
    clienteId: number
  ) {
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.salonId = salonId;
    this.clienteId = clienteId;
  }
}
