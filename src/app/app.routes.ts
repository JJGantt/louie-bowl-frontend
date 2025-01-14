import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitArtComponent } from './submit-art/submit-art.component';
import { RegisterComponent } from './register/register.component';
import { GalleryComponent } from './gallery/gallery.component';
import { VotingComponent } from './voting/voting.component';




export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'submit-art', component: SubmitArtComponent }, 
    { path: 'register', component: RegisterComponent }, 
    { path: 'gallery', component: GalleryComponent },
    { path: 'voting', component: VotingComponent },

];
