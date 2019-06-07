import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

  // addTenant() {
  //   const skill = new Skill();
  //   // tenant.projectId = tenant.project.id;
  //   this.agent.skillList.push(skill);
  //   this.addTenantsForm();
  // }

  // addTenantsForm() {
  //   const control = <FormArray>this.projectForm.controls['skillList'];
  //   control.push(this.initTenants());
  // }

  // addSkillForm() {
  //   const control = <FormArray>this.projectForm.controls['skillList'];
  //   control.push(this.initTenants());
  //   initTenants() {
  //     return this.formBuilder.group({
  //       'obsTenantId': ['', Validators.required],
  //       'publicKey': ['', Validators.required],
  //       'privateKey': ['', Validators.required],
  //       'comment': ['']
  //     });
  //   }
  // }

