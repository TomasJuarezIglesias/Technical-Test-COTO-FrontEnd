import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReservaService } from '../../services/reserva.service';
import { ReservaDto } from '../../interfaces/reserva-dto';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReservaCreateDto } from '../../models/reserva-create-dto';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../core/interfaces/table-column.interface';
import { FieldConfig } from '../../../../core/interfaces/field-config.interface';
import { SalonService } from '../../../salon/services/salon.service';
import { ClienteService } from '../../../cliente/services/cliente.service';
import { firstValueFrom, forkJoin, Subscription } from 'rxjs';
import { TableComponent } from '../../../../core/components/table/table.component';
import { FormComponent } from '../../../../core/components/form/form.component';
import { OptionConfig } from '../../../../core/interfaces/option-config.interface';
import { SnackbarService } from '../../../../core/services/snackbar.service';

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

  private reservaService = inject(ReservaService);
  private salonService = inject(SalonService);
  private clienteService = inject(ClienteService);

  private snackbarService = inject(SnackbarService);

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

  private subscriptions: Subscription[] = [];

  constructor() {
    effect(() => {
      const date = this.datePicked();
      this.loadReservas(date);
    });
  }

  private loadReservas(date: Date): void {
    this.loading.set(true);

    const sub = this.reservaService.getByDate(date).subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.snackbarService.error(err);
      }
    });

    this.subscriptions.push(sub);
  }

  public onDatePicked(date: Date) {
    if (date) {
      this.datePicked.set(date)
    }
  }

  async onCreateReserva(): Promise<void> {
    const apiCalls = forkJoin([
      this.clienteService.getAll(),
      this.salonService.getAll()
    ]);

    const [clientes, salones] = await firstValueFrom(apiCalls);

    const clientesMapped = clientes.map(c => ({ label: c.nombre, value: c.id })) as OptionConfig[];
    const salonesMapped = salones.map(s => ({ label: s.nombre, value: s.id })) as OptionConfig[];

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
      { name: 'clienteId', label: 'Cliente', type: 'select', options: clientesMapped },
      { name: 'salonId', label: 'Salón', type: 'select', options: salonesMapped }
    ];

    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        title: 'Crear nueva reserva',
        form,
        fields,
        loading: false
      },
      width: '600px',
      autoFocus: false
    });

    const sub = dialogRef.componentInstance.submitted.subscribe((value: any) => {
      const dto = new ReservaCreateDto(
        value.fecha,
        value.horaInicio,
        value.horaFin,
        value.salonId,
        value.clienteId
      );

      const sub = this.reservaService.post(dto).subscribe({
        next: (resp) => {
          if (!resp.success) {
            this.snackbarService.error(resp.message ?? 'Ha ocurrido un error');
            return;
          };

          dialogRef.close();
          this.snackbarService.success('Reserva registrada correctamente');
          this.loadReservas(this.datePicked());
        },
        error: (err) => {
          this.snackbarService.error(err.error.message);
        }
      });

      this.subscriptions.push(sub);
    });

    this.subscriptions.push(sub);
  }

}
