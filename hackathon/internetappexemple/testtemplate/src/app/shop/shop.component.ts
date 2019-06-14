import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';
import { AlertService, AuthenticationService } from '../_services';



@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
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

    logout(): void {
        this.authenticationService.logout();
    }
}
