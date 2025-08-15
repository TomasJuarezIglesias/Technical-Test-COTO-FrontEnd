import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReservasService } from '../../services/reservas.service';
import { ReservaDto } from '../../interfaces/reserva-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { TableComponent } from '../../../shared/components/table/table.component';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    TableComponent
  ],
})
export class ListadoComponent {

  private reservasService = inject(ReservasService);

  public readonly columns = [
    { key: 'fecha', label: 'Fecha', value: (r: ReservaDto) => r.fecha ? new Date(r.fecha).toLocaleDateString('es-AR') : '' },
    { key: 'horaInicio', label: 'Hora Inicio', value: (r: ReservaDto) => r.horaInicio },
    { key: 'horaFin', label: 'Hora Fin', value: (r: ReservaDto) => r.horaFin },
    { key: 'cliente', label: 'Cliente', value: (r: ReservaDto) => r.cliente?.nombre },
    { key: 'salon', label: 'Salón', value: (r: ReservaDto) => r.salon?.nombre }
  ];

  public datePicked = signal<Date>(new Date());
  public loading = signal<boolean>(true);
  public data = signal<ReservaDto[]>([]);

  constructor() {
    effect(() => {
      const date = this.datePicked();
      this.loadReservas(date);
    });
  }

  private loadReservas(date: Date): void {
    this.loading.set(true);

    this.reservasService.getByDate(date).subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  public onDatePicked(date: Date) {
    if (date) {
      this.datePicked.set(date)
    }
  }

  onCreateReserva(): void {
  console.log('Abrir formulario de creación de reserva');
}
}
