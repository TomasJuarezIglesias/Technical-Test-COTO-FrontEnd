import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReservaDto } from '../interfaces/reserva-dto';
import { environment } from '../../../../environments/environment';
import { DateHelper } from '../../../core/helpers/date.helper';
import { ApiResponse } from '../../../core/interfaces/api-response';
import { ReservaCreateDto } from '../models/reserva-create-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
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

  post(reservaCreateDto: ReservaCreateDto): Observable<ApiResponse<ReservaDto>> {
    return this.http
      .post<ApiResponse<ReservaDto>>(`${this.baseUrl}`, reservaCreateDto);
  }


}
