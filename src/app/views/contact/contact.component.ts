import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from 'src/app/service/email.service';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form: ContactForm = {
    name: '',
    email: '',
    message: ''
  }

  constructor(private emailService: EmailService) {}

  send(contactForm: NgForm) {
    
    console.log("Object: " + this.form.name + "," + this.form.email);
    this.emailService.sendEmail(this.form);

    contactForm.reset();
  }

}
