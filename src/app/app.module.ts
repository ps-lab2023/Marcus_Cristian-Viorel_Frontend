import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import {MatSnackBar} from "@angular/material/snack-bar";
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UserActivityComponent } from './components/user-activity/user-activity.component';
import { RoomActivityComponent } from './components/room-activity/room-activity.component';
import { RoomTypeActivityComponent } from './components/room-type-activity/room-type-activity.component';
import { GuestActivityComponent } from './components/guest-activity/guest-activity.component';
import { LogInterceptor} from "./log.interceptor";
import { BookingActivityComponent } from './components/booking-activity/booking-activity.component';
import { CredentialsActivityComponent } from './components/credentials-activity/credentials-activity.component';
import { RegisterActivityComponent } from './components/register-activity/register-activity.component';
import { VacantRoomsActivityComponent } from './components/vacant-rooms-activity/vacant-rooms-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AdminPageComponent,
    UserActivityComponent,
    RoomActivityComponent,
    RoomTypeActivityComponent,
    GuestActivityComponent,
    BookingActivityComponent,
    CredentialsActivityComponent,
    RegisterActivityComponent,
    VacantRoomsActivityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [MatSnackBar, { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
