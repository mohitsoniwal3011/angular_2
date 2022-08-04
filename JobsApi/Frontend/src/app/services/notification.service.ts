import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  horizontalposition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top'

  constructor(private snakebar: MatSnackBar) { }

  open(message: string, type: string ) {
    this.snakebar.openFromComponent(
      SnackBarComponent,{
      data : {
        message : message, 
        duration : 3000,
        type : type
      },
      horizontalPosition: this.horizontalposition,
      verticalPosition: this.verticalPosition,
      panelClass : type
    })
  }
}
