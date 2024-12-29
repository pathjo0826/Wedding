import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDatabase, ref, get, Database, set, update } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  database: Database;

  constructor(private http: HttpClient) {
    this.database = getDatabase();
  }

  /** 
   * This method fetches all gifts from the database. It returns a list of gift objects. 
   * @return list of Gift objects
   * */
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

  /**
   * Updates the 'claimed' boolean variable in the database of a specific gift object.
   * @param relative path to the specific gift object
   * @param boolean data to be set to
   */
  async updateClaim(path: string, data: boolean): Promise<any> {
    
    const dbRef = ref(this.database, path);

    try {
      
      await update(dbRef, { claimed: data });
      console.log(`Gift ${path} 'claimed' status updated to: ${data}`);

    } catch (error) {
      console.error('Error updating gift status:', error);
    }
  }
}
