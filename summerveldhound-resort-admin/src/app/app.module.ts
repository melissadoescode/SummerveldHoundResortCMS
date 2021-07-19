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
import { AlbumComponent } from './Components/album/album.component';
import { ContentComponent } from './Components/content/content.component';


@NgModule({
  declarations: [
    AppComponent,
    DoggoComponent,
    LifeEventComponent,
    IconComponent,
    AlbumComponent,
    ContentComponent
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
