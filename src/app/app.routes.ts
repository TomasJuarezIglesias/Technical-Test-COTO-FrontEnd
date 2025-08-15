import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./reservas/reservas.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
