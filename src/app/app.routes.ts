import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitArtComponent } from './submit-art/submit-art.component';
import { RegisterComponent } from './register/register.component';
import { VotingComponent } from './voting/voting.component';
import { AdminComponent } from './admin/admin.component';





export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'submit-art', component: SubmitArtComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'voting', component: VotingComponent },
];
