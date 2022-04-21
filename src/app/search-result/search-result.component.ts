import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery: string = '';
  private searchArtistsSub: any;

  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((x) => {
      this.searchQuery = x['q'];
      console.log('comp: ' + this.searchQuery);
    });

    this.searchArtistsSub = this.data
        .searchArtists(this.searchQuery)
        .subscribe((data) => (this.results = data.artists.items.filter((y) => y.images.length > 0)));
  }

  ngOnDestroy() {
    this.searchArtistsSub.unsubscribe();
  }
}