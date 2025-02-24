import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(formData: any) {
    emailjs
      .send('service_s83ys0o', 'template_2mis1j9', {...formData}, 'e7npe2TO5rF4cCeHS')
      .then(
        (response) => {
          console.log('Email sent succesfully', response);
        },
        (error) => {
          console.error('Error sending email', error);
        }
      );
  }
}
