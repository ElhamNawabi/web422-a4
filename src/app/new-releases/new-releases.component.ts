import { Component, OnDestroy, OnInit } from '@angular/core';
import {MusicDataService} from '../music-data.service';


@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: SpotifyApi.ListOfNewReleasesResponse | any;

  private newReleasesSub: any;

  constructor(private dataService: MusicDataService) { }


  ngOnInit(): void {
    this.newReleasesSub = this.dataService
    .getNewReleases()
    .subscribe((data: any) => {
      this.releases = data;
    });
  }

  ngOnDestroy() {
    this.newReleasesSub.unsubscribe();
  }

}
