import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) {
  }

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }

  public success(message): void {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(message, '', this.config);
  }

  public warn(message): void {
    this.config['panelClass'] = ['notification', 'warn'];
    this.snackBar.open(message, '', this.config);
  }
}
