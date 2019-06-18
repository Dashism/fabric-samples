import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { AlertService, AuthenticationService } from '../_services';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-new-projet',
  templateUrl: './new-projet.component.html',
  styleUrls: ['./new-projet.component.scss'],
  animations : fuseAnimations
})
export class NewProjetComponent implements OnInit {
  newProjectForm: FormGroup;
  newProjectFormErrors: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,

  )
  {
      this.openMenu();
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar : {
                  hidden: true
              },
              toolbar: {
                  hidden: true
              },
              footer : {
                  hidden: true
              }
          }
      };

      // Set the defaults
      this.newProjectFormErrors = {
          name           : {},
          email          : {},
          mobile         : {},
          password       : {},
          passwordConfirm: {}
      };

      // Set the private defaults
      this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {

      this.newProjectForm = this._formBuilder.group({
          projectName           : ['', Validators.required],
          projectDescription           : ['', Validators.required],
          startDay          : ['', Validators.required],
          endDay         : ['', Validators.required],
          skills       : ['', Validators.required]
 
      });

      this.newProjectForm.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this.onNewProjectFormValuesChanged();
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
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

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On form values changed
   */
  onNewProjectFormValuesChanged(): void
  {
      for ( const field in this.newProjectFormErrors )
      {
          if ( !this.newProjectFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.newProjectFormErrors[field] = {};

          // Get the control
          const control = this.newProjectForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.newProjectFormErrors[field] = control.errors;
          }
      }
  }

  onSubmit(){
  }

  readLocalStorageValue(key: string): string {
    return localStorage.getItem(key);
}


}
