import { Component } from '@angular/core';

@Component({
  selector: 'app-email-display',
  templateUrl: './email-display.component.html',
  styleUrls: ['./email-display.component.scss']
})
export class EmailDisplayComponent {

  private emailUser = 'pc';
  private emailDomain = 'reithe.se';

  getEmail(): string {
    return `${this.emailUser}@${this.emailDomain}`;
  }

  getEmailLink(): string {
    return `mailto:${this.getEmail()}`;
  }

}
