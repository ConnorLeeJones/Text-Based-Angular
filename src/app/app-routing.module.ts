import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { PlayersComponent } from './Components/players/players.component';
import { NewPlayerComponent } from './Components/new-player/new-player.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'players', component: PlayersComponent},
  { path: 'newplayer', component: NewPlayerComponent},
  { path: '', redirectTo: '/#', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
