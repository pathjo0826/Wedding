import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isImageVisible: boolean;
  enlargedImageSrc: string;

  constructor() {
    this.isImageVisible = false;
    this.enlargedImageSrc = '';
  }

  public showImage(image: HTMLImageElement): void {
    console.log('Shooting');
    this.enlargedImageSrc = image.src;
    this.isImageVisible = true;
  }

  public hideImage(): void {
    this.isImageVisible = false;
  }
}
