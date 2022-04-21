import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id: any;
  album: SpotifyApi.SingleAlbumResponse | any;
  private albumByIdSub: any;
  MusicDataService: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((i) => {
      this.id = i.get('id');
    });

    this.albumByIdSub = this.data
      .getAlbumById(this.id)
      .subscribe((data) => {
        (this.album = data);
      })
  }

  addToFavourites(trackID: string): void {
    this.MusicDataService.addToFavourites(trackID).subscribe(
      (ableToAddData: any) => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500
        });
      },
      (error: any) => {
        this.snackBar.open('Unable to add song to Favourites...', 'Done', {
          duration: 1500
        });
      }
    );
  }

  ngOnDestroy() {
    this.albumByIdSub.unsubscribe();
  }
}