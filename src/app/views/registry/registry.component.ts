import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/domain/gift';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  giftList: Gift[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchGifts()
  }

  fetchGifts() {
    this.firebaseService.fetchGifts().subscribe((gifts) => {
      this.giftList = gifts;
    })
  }

  updateGiftStatus() {

    const path = "gifts/gift_1";
    const data = { claimed: false };

    this.firebaseService.updateClaim(path, data).subscribe(() => {
      try {
        console.log("Update successful");
        this.ngOnInit();

      } catch (error) {
        console.error("Update failed", error);
      }
    });
  }
}
