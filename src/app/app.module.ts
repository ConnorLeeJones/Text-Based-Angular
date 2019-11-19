import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { PlayersComponent } from './Components/players/players.component';
import { NewPlayerComponent } from './Components/new-player/new-player.component';
import { BattleComponent } from './Components/battle/battle.component';
import { PlayerViewComponent } from './Components/player-view/player-view.component';
import * as $ from "jquery";
import { FinishBattleComponent } from './Components/finish-battle/finish-battle.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    PlayersComponent,
    NewPlayerComponent,
    BattleComponent,
    PlayerViewComponent,
    FinishBattleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
