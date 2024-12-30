import { Injectable } from '@angular/core';
import { Database, getDatabase, push, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {

  database: Database;

  constructor() {
    this.database = getDatabase();
   }

   /**
    * Posts a Guest object to the database.
    * @param guest 
    */
   async addGuest(guest: any) {

    const dbRef = ref(this.database, '/rsvp');

    try {

      await push(dbRef, guest);
      console.log(`Rsvp ${guest} added to database`);

    } catch (error) {
      console.error('Error adding guest:', error);
    }
   }
}
