import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  error(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
