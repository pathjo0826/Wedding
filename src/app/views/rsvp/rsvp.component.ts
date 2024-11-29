import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  validName: boolean;

  constructor(private http: HttpClient) {
    this.validName = true;
  }

  addGuest(guest: { name: string, plusOne: string, additional: string }, guestForm: any) {
   
    console.log(guest);
    
    try {
      this.validateName(guest.name);
      const url = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/guests.json';
      this.http.post(url, guest).subscribe((resp) => {
        console.log(resp);
      })

      this.validName = true;
      guestForm.reset();

    } catch (error) {
      this.validName = false;
      console.log('Invalid name')
    }
  }

  validateName(name: string) {
    if (name.length < 1) {
      throw Error;
    }
  }
}
