import { Component, OnInit } from '@angular/core';
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

  isNameMissing!: boolean;
  isNameIncorrect!: boolean;
  isEmailMissing!: boolean;
  isEmailIncorrect!: boolean;
  isMessageMissing!: boolean;
  isMessageIncorrect!: boolean;

  isFormSubmitted!: boolean;

  constructor(private emailService: EmailService) { }
  
  send(contactForm: NgForm) {
    
    this.isNameMissing = false;

    this.isEmailMissing = false;
    this.isEmailIncorrect = false;

    this.isMessageMissing = false;

    this.isFormSubmitted = true;
    
    try {
      this.validateFormData();
      this.emailService.sendEmail(this.form);
      contactForm.resetForm();
    } catch (Error) {
      console.log('Validation failed.');
    }
  }

  validateFormData() {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
  }

  validateName() {
    if (this.form.name.trim().length < 1 && this.isFormSubmitted) {
      this.isNameMissing = true;
      throw Error;
    }
  }

  validateEmail() {
    if (!this.form.email && this.isFormSubmitted) {
      this.isEmailMissing = true;
      throw Error;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.email) && this.isFormSubmitted) {
      this.isEmailIncorrect = true;
      throw Error;
    }
  }

  validateMessage() {
    if (this.form.message.trim().length < 1 && this.isFormSubmitted) {
      this.isMessageMissing = true;
      throw Error;
    }
  }
}
