import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Gift } from '../domain/gift';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  appCheckToken: string | null = null;

  constructor(private http: HttpClient) { 

    console.log('FirebaseService initialized');

    this.appCheckToken = localStorage.getItem('firebaseAppCheckToken');
    
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
