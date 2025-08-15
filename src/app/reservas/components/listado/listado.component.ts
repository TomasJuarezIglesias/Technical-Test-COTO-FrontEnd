import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { ReservasService } from '../../services/reservas.service';
import { ReservaDto } from '../../interfaces/reserva-dto';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
  ],
})
export class ListadoComponent implements OnInit {

  private reservasService = inject(ReservasService);

  public dateCtrl = new FormControl<Date | null>(new Date());

  public loading = signal<boolean>(true);
  public data = signal<ReservaDto[]>([]);

  ngOnInit(): void {
    const date = this.dateCtrl.value ?? new Date();

    this.reservasService.getByDate(date).subscribe({
      next: (data) => {
        this.data.set(data);

        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
