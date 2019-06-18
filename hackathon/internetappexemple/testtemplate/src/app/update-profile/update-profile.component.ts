import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations/index';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService, UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit, OnDestroy{
    updateProfileForm: FormGroup;
    updateProfileFormErrors: any;
  loading = false;
  submitted = false;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
      private _fuseConfigService: FuseConfigService,
      private _formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService

  ) {
      this.openMenu();
      // Configure the layout
      this._fuseConfigService.config = {
          layout: {
              navbar: {
                  hidden: true
              },
              toolbar: {
                  hidden: true
              },
              footer: {
                  hidden: true
              }
          }
      };

      // Set the defaults
      this.updateProfileFormErrors = {
          name: {},
          firstname: {},
          email: {},
          mobile: {},
          username: {},
          password: {},
          passwordConfirm: {}
      };

      // Set the private defaults
      this._unsubscribeAll = new Subject();

      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

      this.updateProfileForm = this._formBuilder.group({
          name: ['', Validators.required],
          firstname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{10}$/)]],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          passwordConfirm: ['', [Validators.required, confirmPassword]]
      });

      this.updateProfileForm.valueChanges
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
              this.onUpdateProfileFormValuesChanged();
          });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next();
      this._unsubscribeAll.complete();
  }

  openMenu() {
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

  readLocalStorageValue(key: string): string {
      return localStorage.getItem(key);
  }
  /**
   * On form values changed
   */
  onUpdateProfileFormValuesChanged(): void {
      for (const field in this.updateProfileFormErrors) {
          if (!this.updateProfileFormErrors.hasOwnProperty(field)) {
              continue;
          }

          // Clear previous errors
          this.updateProfileFormErrors[field] = {};

          // Get the control
          const control = this.updateProfileForm.get(field);

          if (control && control.dirty && !control.valid) {
              this.updateProfileFormErrors[field] = control.errors;
          }
      }
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateProfileForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.updateProfileForm.invalid) {
          return;
      }

    //   this.loading = true;
    //   this.userService.updateProfile(this.updateProfileForm.value)
    //       .pipe(first())
    //       .subscribe(
    //           data => {
    //               this.alertService.success('Registration successful', true);
    //               this.router.navigate(['/user-profile']);
    //           },
    //           error => {
    //               this.alertService.error(error);
    //               this.loading = false;
    //           });
  }


}

/**
* Confirm password
*
* @param {AbstractControl} control
* @returns {{passwordsNotMatch: boolean}}
*/
function confirmPassword(control: AbstractControl): any {
  if (!control.parent || !control) {
      return;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
      return;
  }

  if (passwordConfirm.value === '') {
      return;
  }

  if (password.value !== passwordConfirm.value) {
      return {
          passwordsNotMatch: true
      };
  }
}
