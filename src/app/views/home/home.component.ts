import { Component } from '@angular/core';
import { TimerComponent } from 'src/app/components/timer/timer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isImageVisible: boolean;
  enlargedImageSrc: string;
  timer: TimerComponent;

  constructor() {
    this.timer = new TimerComponent();
    this.isImageVisible = false;
    this.enlargedImageSrc = '';
  }

  public showImage(image: HTMLImageElement): void {
    this.enlargedImageSrc = image.src;
    this.isImageVisible = true;
  }

  public hideImage(): void {
    this.isImageVisible = false;
  }
}
