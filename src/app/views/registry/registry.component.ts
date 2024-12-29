import { Component, OnInit } from '@angular/core';
import { Gift } from 'src/app/domain/gift';
import { FirebaseService } from 'src/app/service/firebase.service';
import { GiftService } from 'src/app/service/gift.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  giftList: Gift[] = [];
  data: any;

  constructor(private firebaseService: FirebaseService, private giftService: GiftService) { }

  async ngOnInit() {
    await this.fetchGifts();
  }

  async fetchGifts(): Promise<void> {
    try {
      this.giftList = await this.giftService.fetchGifts();
    } catch (error) {
      console.log('Error in RegistryComponent fetching data', error);
      throw error;
    }
  }

  sortGifts(category: string) {
    let categoryGifts: Gift[] = [];

    this.giftList.forEach((gift) => {

      if (gift.category === category) {
        categoryGifts.push(gift);
      }
    });

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

  async updateGiftStatusNew(gift: Gift) {

    // Construct the path dynamically based on gift's id
    const path = `gifts/gift_${gift.id}`;

    // Toggle claimed variable true/false
    const data = !gift.claimed;

    try {
      await this.giftService.updateClaim(path, data);
      this.ngOnInit();

    } catch (error) {
      console.error("Update failed", error);
    }
  }

  getGiftStyle(gift: { claimed: boolean }) {
    return {
      'text-decoration': gift.claimed ? 'line-through' : 'none',
      'color': gift.claimed ? 'gray' : 'black',
    };
  }
}
