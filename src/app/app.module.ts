import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { ScheduleComponent } from './views/schedule/schedule.component';
import { ContactComponent } from './views/contact/contact.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './views/error/error.component';
import { TimerComponent } from './components/timer/timer.component';
import { RsvpComponent } from './views/rsvp/rsvp.component';
//import { RegistryComponent } from './views/registry/registry.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'About', component: AboutComponent},
  {path: 'Schedule', component: ScheduleComponent},
  //{path: 'Registry', component: RegistryComponent}, 
  {path: 'Contact', component: ContactComponent},
  {path: 'Rsvp', component: RsvpComponent},
  {path: '**', component: ErrorComponent} 
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
    //RegistryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
