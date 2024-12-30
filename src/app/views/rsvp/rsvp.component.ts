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
  guests: string[] = [''];

  constructor(private rsvpService: RsvpService) {
    this.validName = true;
  }

  async oldAddGuest(guest: { name: string, plusOne: string, additional: string }, guestForm: NgForm) {
    
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

  async addGuest(rsvp: {name: string[], message: string}, newguestForm: NgForm) {

    try {

      console.log(rsvp);
      await this.rsvpService.addGuest(rsvp);
      newguestForm.reset();
      
    } catch (error) {
      console.error("Update failed", error);
    }
  }

  addLine() {
    this.guests.push('');
  }

  trackByIndex(index: number): number {
    return index; // Tracks items by their index
  }

  validateName(name: string) {
    if (name.length < 1) {
      throw Error;
    }
  }
}
