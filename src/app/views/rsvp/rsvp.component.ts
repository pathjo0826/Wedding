import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  validName: boolean;

  constructor(private firebaseService: FirebaseService) {
    this.validName = true;
  }

  addGuest(guest: {name: string, plusOne: string, additional: string}, guestForm: NgForm) {
    try {
      this.validateName(guest.name);
      this.firebaseService.addGuest(guest).subscribe();
      
      this.validName = true;
      guestForm.reset();

    } catch (error) {
      this.validName = false;
      console.error("Adding a Guest failed: " + error);
    }
  }

  validateName(name: string) {
    if (name.length < 1) {
      throw Error;
    }
  }
}
