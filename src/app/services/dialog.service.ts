import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  public openConfirmDialog(message: string) {
    return this.dialog.open(DialogComponent, {
      width: '390px',
      panelClass: 'dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data: {
        message: message
      }
    });
  }

  public openDialog(component: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    return this.dialog.open(component, dialogConfig);
  }
}
