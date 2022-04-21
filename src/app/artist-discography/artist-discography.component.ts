import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  id: any;
  artist: SpotifyApi.SingleArtistResponse | any;
  albums: SpotifyApi.ArtistsAlbumsResponse | any;

  private artistByIdSub: any;
  private albumsByArtistId: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((x) => {
      this.id = x.get('id');
    });

    this.artistByIdSub = this.data
      .getArtistsById(this.id)
      .subscribe((data) => {
        this.artist = data;
      })

    this.albumsByArtistId = this.data.getAlbumsByArtistId(this.id).subscribe(
      (data) => 
      (this.albums = data.items.filter(
        (value, index, self) => 
        self.findIndex(
          (y) => y.name.toUpperCase() === value.name.toUpperCase()
        ) === index
      ))
    );
  }

  ngOnDestroy(): void {
    this.artistByIdSub.unsubscribe();
    this.albumsByArtistId.unsubscribe();
  }
}