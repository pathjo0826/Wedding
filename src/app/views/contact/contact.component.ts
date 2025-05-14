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
  isFormAccepted!: boolean;

  constructor(private emailService: EmailService) { 
    this.isFormSubmitted = false;
    this.isFormAccepted = false;
  }
  
  public send() {
    
    this.isNameMissing = false;
    this.isEmailMissing = false;
    this.isEmailIncorrect = false;
    this.isMessageMissing = false;

    this.isFormSubmitted = true;
    
    try {
      this.validateFormData();
      this.emailService.sendEmail(this.form);
      this.acknowledgeSubmission();
    } catch (Error) {
      console.log('Validation failed.');
    }
  }

  public validateFormData() {
    this.validateName();
    this.validateEmail();
    this.validateMessage();
  }

  public validateName() {
    if (this.form.name.trim().length < 1 && this.isFormSubmitted) {
      this.isNameMissing = true;
      throw Error;
    }
  }

  public validateEmail() {
    if (!this.form.email && this.isFormSubmitted) {
      this.isEmailMissing = true;
      throw Error;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.form.email) && this.isFormSubmitted) {
      this.isEmailIncorrect = true;
      throw Error;
    }
  }

  public validateMessage() {
    if (this.form.message.trim().length < 1 && this.isFormSubmitted) {
      this.isMessageMissing = true;
      throw Error;
    }
  }

  public acknowledgeSubmission(){
    this.isFormAccepted = true;
  }
}
