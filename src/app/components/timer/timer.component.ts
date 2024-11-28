import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  target: any;
  now: any;
  //difference: any;

  remDays: any;
  remHours: any;
  remMinutes: any;
  remSeconds: any;

  intervalId: any;

  constructor() {

    /** 19th July 2025, 12:30Z */
    this.target = new Date(2025, 6, 19, 12, 30);
    /** Now */
    this.now = new Date(Date.now());

    this.updateTimeDifference();
    this.intervalId = setInterval(() => {
      this.updateTimeDifference();
    }, 1000);
  }

  updateTimeDifference() {
    const now = new Date(Date.now());
    const difference = this.target.getTime() - now.getTime();

    if (difference <= 0) {
      clearInterval(this.intervalId);
      this.remDays = this.remHours = this.remMinutes = this.remSeconds = 0;
    } else {
      this.calculateDifference(difference);
    }
  }

  calculateDifference(difference: number): void {

    try {
      const msInSecond = 1000;
      const msInMinute = 60 * msInSecond;
      const msInHour = 60 * msInMinute;
      const msInDay = 24 * msInHour;

      this.remDays = Math.floor(difference / msInDay);
      difference %= msInDay;

      this.remHours = Math.floor(difference / msInHour);
      difference %= msInHour;

      this.remMinutes = Math.floor(difference / msInMinute);
      difference %= msInMinute;

      this.remSeconds = Math.floor(difference / msInSecond);

      console.log("Time remaining: " + this.remDays + " days, " + this.remHours + ":" + this.remMinutes + ":" + this.remSeconds);
    } catch (error) {
      console.log('Error in calculateDifference', error);
    }
  }

  ngOnDestroy(): void {
    console.log('Component destroyed. Clearing interval.');
    clearInterval(this.intervalId); // Clean up interval when component is destroyed
  }
}
