import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../../core/interfaces/api-response';
import { DateHelper } from '../../core/helpers/date.helper';
import { ReservaDto } from '../interfaces/reserva-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Reserva`;

  getByDate(date: Date): Observable<ReservaDto[]> {
    const iso = DateHelper.toIsoDateLocal(date);

    return this.http
      .get<ApiResponse<ReservaDto[]>>(`${this.baseUrl}/${iso}`)
      .pipe(map((r) => {
        return r.data ?? [];
      }));
  }


}
