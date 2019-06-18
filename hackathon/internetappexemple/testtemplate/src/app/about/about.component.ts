import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AlertService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
      this.openMenu();
  };

  ngOnInit() {
  }

    openMenu(){
        $('body').removeClass('noScroll');

        if ($('.collapse').hasClass('collapse-active')) {
            $('.collapse').removeClass('collapse-active');
        }
        else {
            $('.collapse').addClass('collapse-active');
        }
    }

    readLocalStorageValue(key: string): string {
        return localStorage.getItem(key);
    }

    logout(): void {
        this.authenticationService.logout();
    }
}
