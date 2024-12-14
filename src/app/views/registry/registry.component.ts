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

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.fetchGifts()
  }

  fetchGifts() {
    this.firebaseService.fetchGifts().subscribe((gifts) => {
      this.giftList = gifts;
    })
  }

  sortGifts(category: string) {
    let categoryGifts: Gift[] = [];
    
    this.giftList.forEach((gift) => {
      
      if (gift.category === category) {
        categoryGifts.push(gift);
      }
    }
  )
  return categoryGifts;
  }

  updateGiftStatus(gift: Gift) {

    // Construct the path dynamically based on gift's id
    const path = `gifts/gift_${gift.id}`;

    // Toggle claimed variable true/false
    const data = { claimed: !gift.claimed };

    this.firebaseService.updateClaim(path, data).subscribe(() => {
      try {
        console.log("Update: " + path + " successful");
        this.ngOnInit();

      } catch (error) {
        console.error("Update failed", error);
      }
    });
  }
}
