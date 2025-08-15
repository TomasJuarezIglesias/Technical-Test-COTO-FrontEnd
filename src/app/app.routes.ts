import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/reserva/reservas.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
