import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectbuilderComponent } from './projectbuilder/projectbuilder.component';
import { CurrentprojectComponent } from './currentproject/currentproject.component';
import { SkillslistComponent } from './skillslist/skillslist.component';
import { SkillsmarketComponent } from './skillsmarket/skillsmarket.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'projectbuilder', component: ProjectbuilderComponent },
    { path: 'currentproject', component: CurrentprojectComponent },
    { path: 'skillslist', component: SkillslistComponent },
    { path: 'skillsmarket', component: SkillsmarketComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
