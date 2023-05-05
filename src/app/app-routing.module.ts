import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AdminPageComponent} from "./components/admin-page/admin-page.component";
import {UserActivityComponent} from "./components/user-activity/user-activity.component";
import {RoomActivityComponent} from "./components/room-activity/room-activity.component";
import {RoomTypeActivityComponent} from "./components/room-type-activity/room-type-activity.component";
import {GuestActivityComponent} from "./components/guest-activity/guest-activity.component";
import {CredentialsActivityComponent} from "./components/credentials-activity/credentials-activity.component";
import {BookingActivityComponent} from "./components/booking-activity/booking-activity.component";
import {RegisterActivityComponent} from "./components/register-activity/register-activity.component";
import {VacantRoomsActivityComponent} from "./components/vacant-rooms-activity/vacant-rooms-activity.component";

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: 'user-activity', component: UserActivityComponent},
  { path: 'room-activity', component: RoomActivityComponent},
  { path: 'roomType-activity', component: RoomTypeActivityComponent},
  { path: 'guest-activity', component: GuestActivityComponent},
  { path: 'booking-activity', component: BookingActivityComponent},
  { path: 'credentials-activity', component: CredentialsActivityComponent},
  { path: 'register-activity', component: RegisterActivityComponent},
  { path: 'vacant-rooms-activity', component: VacantRoomsActivityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
