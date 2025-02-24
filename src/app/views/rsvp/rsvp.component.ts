import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RsvpService } from 'src/app/service/rsvp.service';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  attending!: boolean;
  guests: string[] = [''];
  message: string = '';
  validationErrors: boolean[] = [false];

  constructor(private rsvpService: RsvpService) {}

   async addGuest(guestForm: NgForm) {

    try {
      const rsvp = {
        attending: this.attending,
        name: this.guests,
        message: this.message
      };

      // Reset validation errors
      this.validationErrors = this.guests.map(() => false);

      // Mark the specific field as invalid
      rsvp.name.forEach((name, index) => {
        try {
          this.validateName(name);
        } catch (error) {
          this.validationErrors[index] = true;
        }
      });
      
      // Check if there are any validation errors
      if (this.validationErrors.some((error) => error)) {
        throw new Error('Validation failed');
      }

      console.log('RSVP object: ' +  rsvp.name + ", " + rsvp.attending + ", " + rsvp.message);
  
      await this.rsvpService.addGuest(rsvp);
      guestForm.reset();    
      
      // Reset guest list  
      this.guests = ['']; 
      // Reset errors
      this.validationErrors = [false]; 

    } catch (error) {
      console.error("Update failed", error);
    }
  }

  addLine() {
    this.guests.push('');
  }

  trackByIndex(index: number): number {
    // Tracks items by their index
    return index; 
  }

  validateName(name: string) {
    if (!name || name.trim().length < 1) {
      throw Error;
    }
  }
}
