import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/interfaces/api-response';
import { SalonDto } from '../interfaces/salon-dto';

@Injectable({
  providedIn: 'root'
})
export class SalonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Salon`;

  getAll(): Observable<SalonDto[]> {
    return this.http
      .get<ApiResponse<SalonDto[]>>(`${this.baseUrl}`)
      .pipe(map((r) => {
        return r.data ?? [];
      }));
  }
}
