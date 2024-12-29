import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider, getToken } from 'firebase/app-check';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { enableLogging } from 'firebase/database';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { ContactComponent } from './views/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './views/error/error.component';
import { TimerComponent } from './components/timer/timer.component';
import { RsvpComponent } from './views/rsvp/rsvp.component';
import { RegistryComponent } from './views/registry/registry.component';
import { FaqComponent } from './views/faq/faq.component';
import { EmailDisplayComponent } from './components/email-display/email-display.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Schedule', component: ScheduleComponent },
  { path: 'Registry', component: RegistryComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'Rsvp', component: RsvpComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ScheduleComponent,
    ContactComponent,
    ErrorComponent,
    TimerComponent,
    RsvpComponent,
    RegistryComponent,
    FaqComponent,
    EmailDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [provideDatabase(() => getDatabase())],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

    // Initialize Firebase App
    const app = initializeApp(environment.firebase);

    try {

      // Initialize App Check with reCAPTCHAv3
      const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider('6LeVw6YqAAAAAMSHu5q94FNCOdQgnV48JjOidVRE'),
        isTokenAutoRefreshEnabled: true,
      });

      console.log('AppCheck init OK');

      getToken(appCheck, true).then((token: any) => {
        
        // Saves token in localstorage
        localStorage.setItem('firebaseAppCheckToken', token.token);
        console.log("AppCheck Token:", token);

      }).catch((error: any) => {
        console.error("AppCheck Error:", error);
      });

    } catch (error) {
      console.log('AppCheck init failed,' + error);
    }
  }
}
