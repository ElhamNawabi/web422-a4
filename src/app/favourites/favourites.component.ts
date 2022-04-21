import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  favourites: Array<any> = [];
  private getFavouritesSub: any;
  private removeFromFavouritesSub: any;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.getFavouritesSub = this.data
      .getFavourites()
      .subscribe((data) => (this.favourites = data.tracks));
  }

  removeFromFavourites(id: string) {
    this.removeFromFavouritesSub = this.data
      .removeFromFavourites(id)
      .subscribe((data) => (this.favourites = data.tracks));
  } 

  ngOnDestroy() {
    this.getFavouritesSub.unsubscribe();
    this.removeFromFavouritesSub.unsubscribe();
  }
}