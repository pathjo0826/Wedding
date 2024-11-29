import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  constructor(private http: HttpClient) {

  }

  addGuest(guests: {name: string, plusOne: string, additional: string}){
    console.log(guests);
    const url = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/guests.json';
    this.http.post(url, guests).subscribe((resp) => {
      console.log(resp);
    })
  }
}
