import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Gift } from '../domain/gift';
import { getDatabase, ref, get } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  appCheckToken: string | null = null;

  constructor(private http: HttpClient) { 

    this.appCheckToken = localStorage.getItem('firebaseAppCheckToken');

    console.log('Token received in service: ' + this.appCheckToken);
  }

  fetchGiftsFirebaseSDK() {

    const db = getDatabase();
    const giftsRef = ref(db, 'gifts');
    get(giftsRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error reading data:", error);
    });
  }

  fetchGifts(): Observable<any> {

    const url = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/gifts.json';
    const headers = new HttpHeaders({
      'X-Firebase-AppCheck': this.appCheckToken || ''
    });
    return this.http.get<Gift[]>(url, {headers}).pipe(map((resp) => {
      const gifts = [];
      for (const gift in resp) {
        gifts.push({ ...resp[gift] });
      }
      return gifts;
    }));
  }

   updateClaim(path: string, data: any): Observable<any> {

    const databaseUrl = "https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/";
    const url = databaseUrl + "/" + path + ".json";

    return this.http.patch(url, data);
  }

  addGuest(guest: any) {
    const url = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/guests.json';

    return this.http.post(url, guest);
  }
}
