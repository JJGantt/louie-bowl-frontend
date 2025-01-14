import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Ensure this points to your routes file

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Provide HTTP client
    provideRouter(routes), // Provide router with routes
  ],
}).catch((err) => console.error(err));
