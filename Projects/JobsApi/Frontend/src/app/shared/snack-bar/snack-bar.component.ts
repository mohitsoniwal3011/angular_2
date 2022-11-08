import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  progress = 100;
  private currentIntervalId: number;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {
  }
  step = 0.005;
  duration = this.data.duration;
  intervalId = window.setInterval(() => {
    this.progress -= 100 * this.step;
    if (this.progress <= 0) {
      this.snackBarRef.dismiss();
      this.cleanProgressBarInterval()
    }
  },this.duration * this.step)
  cleanProgressBarInterval() {
    clearInterval(this.intervalId);
  }
}
