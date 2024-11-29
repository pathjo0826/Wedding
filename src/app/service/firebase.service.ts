import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private databaseUrl = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }
}
