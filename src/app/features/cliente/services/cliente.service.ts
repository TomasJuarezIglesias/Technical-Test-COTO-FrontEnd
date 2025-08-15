import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/interfaces/api-response';
import { ClienteDto } from '../interfaces/cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/Cliente`;

  getAll(): Observable<ClienteDto[]> {
    return this.http
      .get<ApiResponse<ClienteDto[]>>(`${this.baseUrl}`)
      .pipe(map((r) => {
        return r.data ?? [];
      }));
  }
}
