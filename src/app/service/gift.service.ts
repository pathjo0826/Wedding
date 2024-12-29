import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  appCheckToken: string | null = null;

  constructor(private http: HttpClient) {
    this.appCheckToken = localStorage.getItem('firebaseAppCheckToken');
    console.log('Token received in GiftService: ' + this.appCheckToken);
  }

  fetchGiftsHttp(): void {
    console.log('Running HTTP...')

    const headers = new HttpHeaders().set('X-Firebase-AppCheck', this.appCheckToken || '');
    this.http.get('https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/gifts.json', {headers})
      .subscribe(
        data => console.log('Gifts:', data),
        error => console.error('Error fetching data:', error)
      );
  }

  async fetchGifts(): Promise<any> {

    const database = getDatabase();
    const dbRef = ref(database, '/gifts');

    try {
      const snapshot = await get(dbRef); // Await the `get` call
      const gifts = [];

      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const gift in data) {
          gifts.push({ key: gift, ...data[gift] });
        }
      } else {
        console.log('No data available');
      }
      return gifts;

    } catch (error) {
      console.log('Shit goes wrong here?')
      console.error('Error fetching data:', error);
    }
  }
}
