import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoggoAlbumComponent } from './Components/doggo-album/doggo-album.component';
import { DoggoComponent } from './Components/doggo/doggo.component';
import { LifeEventComponent } from './Components/life-event/life-event.component';

const routes: Routes = [
  {path:'', component:DoggoComponent},
  {path:'summerveldhoundresort/doggo', component:DoggoComponent},
  {path:'summerveldhoundresort/lifeevent', component:LifeEventComponent},
  {path:'summerveldhoundresort/doggoalbum', component:DoggoAlbumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
