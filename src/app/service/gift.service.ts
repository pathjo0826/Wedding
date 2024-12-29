import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, get, Database, set, update } from 'firebase/database';
import { Gift } from '../domain/gift';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  //appCheckToken: string | null = null;
  database: Database;

  constructor(private http: HttpClient) {
    this.database = getDatabase();
    //this.appCheckToken = localStorage.getItem('firebaseAppCheckToken');
    //console.log('Token received in GiftService: ' + this.appCheckToken);
  }

  /*
  fetchGiftsHttp(): void {
    console.log('Running HTTP...')

    const headers = new HttpHeaders().set('X-Firebase-AppCheck', this.appCheckToken || '');
    this.http.get('https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/gifts.json', {headers})
      .subscribe(
        data => console.log('Gifts:', data),
        error => console.error('Error fetching data:', error)
      );
  }
  */

  async fetchGifts(): Promise<any> {

    const dbRef = ref(this.database, '/gifts');

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
      console.error('Error fetching data:', error);
    }
  }

  async updateClaim(path: string, data: boolean): Promise<any> {

    try {
      const dbRef = ref(this.database, path);
      await update(dbRef, { claimed: data });
      console.log(`Gift ${path} 'claimed' status updated to: ${data}`);

    } catch (error) {
      console.error('Error updating gift status:', error);
    }
  }
}
