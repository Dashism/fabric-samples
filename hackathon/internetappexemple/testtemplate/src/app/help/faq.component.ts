import { Component } from '@angular/core';
import * as $ from 'jquery';
import { AlertService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-help',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

    faqsFiltered = [
        {
            'question': 'Bla bla ?',
            'answer': 'ceci cela ceci cela ceci cela ceci cela ceci cel aceci cela ceci cela'
        },
        {
            'question': 'Bla bla ?',
            'answer': 'ceci cela ceci cela ceci cela ceci cela ceci cel aceci cela ceci cela'
        }
        ];

    constructor(private authenticationService: AuthenticationService) {
        this.openMenu();
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
