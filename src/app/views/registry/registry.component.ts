import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gift } from 'src/app/domain/gift';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  giftList: Gift[] = [];

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchGifts()
  }

  fetchGifts() {
    this.firebaseService.fetchGifts().subscribe((gifts) => {
      this.giftList = gifts;
    })
  }

  fetchGifts_old() {

    try {
      const url = 'https://wedding-29b48-default-rtdb.europe-west1.firebasedatabase.app/gifts.json';
      this.http.get(url).subscribe((resp) => {

        this.giftList = Object.values(resp);

        this.giftList.forEach(gift => {
          console.log("Id: " + gift.id + ",\nName: " + gift.name + ",\nLink: " + gift.link + ",\nClaimed: " + gift.claimed);
        })
      })
    } catch (error) {
      console.error('Error fetching gifts', error);
    }
  }

  updateGiftStatus() {

    const path = "gifts/gift_2";
    const data = { claimed: false };

    this.firebaseService.updateClaim(path, data).subscribe(() => {
      try {
        console.log("Update successful");
        this.ngOnInit();

      } catch (error) {
        console.error("Update failed", error);
      }
    })
  }
}
