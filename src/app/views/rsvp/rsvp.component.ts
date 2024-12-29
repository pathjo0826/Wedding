import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseService } from 'src/app/service/firebase.service';
import { RsvpService } from 'src/app/service/rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  validName: boolean;

  constructor(private rsvpService: RsvpService) {
    this.validName = true;
  }

  async addGuest(guest: { name: string, plusOne: string, additional: string }, guestForm: NgForm) {
    
    try {
      this.validateName(guest.name);
      await this.rsvpService.addGuest(guest);

      this.validName = true;
      guestForm.reset();

    } catch (error) {
      this.validName = false;
      console.error("Update failed", error);
    }
  }

  validateName(name: string) {
    if (name.length < 1) {
      throw Error;
    }
  }
}
