import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { TableColumn } from '../../../shared/interface/table-column.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { FieldConfig } from '../../../shared/interface/field-config.interface';
import { FormComponent } from '../../../shared/components/form/form.component';
import { ReservaCreateDto } from '../../models/reserva-create-dto';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listado',
  standalone: true,
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss',
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

  private fb = inject(FormBuilder);
  private dialog = inject(MatDialog);
  private reservasService = inject(ReservasService);

  public readonly columns = [
    { key: 'fecha', label: 'Fecha', value: (r: ReservaDto) => r.fecha ? new Date(r.fecha).toLocaleDateString('es-AR') : '' },
    { key: 'horaInicio', label: 'Hora Inicio', value: (r: ReservaDto) => r.horaInicio },
    { key: 'horaFin', label: 'Hora Fin', value: (r: ReservaDto) => r.horaFin },
    { key: 'cliente', label: 'Cliente', value: (r: ReservaDto) => r.cliente?.nombre },
    { key: 'salon', label: 'Salón', value: (r: ReservaDto) => r.salon?.nombre }
  ] as TableColumn[];

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
    const form = this.fb.group({
      fecha: [new Date(), Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      clienteId: [null, Validators.required],
      salonId: [null, Validators.required]
    });

    const fields: FieldConfig[] = [
      { name: 'fecha', label: 'Fecha', type: 'date' },
      { name: 'horaInicio', label: 'Hora Inicio', type: 'time' },
      { name: 'horaFin', label: 'Hora Fin', type: 'time' },
      {
        name: 'clienteId', label: 'Cliente', type: 'select', options: [
          { label: 'Cliente A', value: 1 },
          { label: 'Cliente B', value: 2 }
        ]
      },
      {
        name: 'salonId', label: 'Salón', type: 'select', options: [
          { label: 'Salón 1', value: 1 },
          { label: 'Salón 2', value: 2 }
        ]
      }
    ];

    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Crear nueva reserva',
        form,
        fields,
        loading: false
      },
      width: '500px',
      autoFocus: false
    });

    dialogRef.componentInstance.submitted.subscribe((value: any) => {
      const dto = new ReservaCreateDto(
        value.fecha,
        value.horaInicio + ':00',
        value.horaFin + ':00',
        value.salonId,
        value.clienteId
      );

      // this.reservasService.create(dto).subscribe({
      //   next: () => {
      //     this.loadReservas(this.datePicked());
      //     dialogRef.close();
      //   },
      //   error: (err) => console.error(err)
      // });
    });
  }

}
