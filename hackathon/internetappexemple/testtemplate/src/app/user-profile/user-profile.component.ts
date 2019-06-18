import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
  } 

  getFromLocalStorage (key) { return localStorage.getItem(key); }

  

}
