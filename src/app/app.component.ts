/*********************************************************************************
* WEB422 – Assignment 5/6
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Elham Nawabi Student ID: 115194201 Date: April 15, 2022
*
********************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assignment5App';
  searchString: string = '';
  token!: any;

  constructor(private router: Router, private auth: AuthService) {}

  handleSearch() {
    this.router.navigate(['/search'], {
       queryParams: {q: this.searchString}
    });
    this.searchString = '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationStart){
        this.token = this.auth.readToken();
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

