import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DoggoComponent } from './Components/doggo/doggo.component';
import { LifeEventComponent } from './Components/life-event/life-event.component';
import { IconComponent } from './Components/icon/icon.component';
import { DoggoAlbumComponent } from './Components/doggo-album/doggo-album.component';


@NgModule({
  declarations: [
    AppComponent,
    DoggoComponent,
    LifeEventComponent,
    IconComponent,
    DoggoAlbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
