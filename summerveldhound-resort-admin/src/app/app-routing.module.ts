import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './Components/album/album.component';
import { DoggoComponent } from './Components/doggo/doggo.component';
import { IconComponent } from './Components/icon/icon.component';
import { LifeEventComponent } from './Components/life-event/life-event.component';

const routes: Routes = [
  {path:'', component:DoggoComponent},
  {path:'summerveldhoundresort/doggo', component:DoggoComponent},
  {path:'summerveldhoundresort/lifeevent', component:LifeEventComponent},
  {path:'summerveldhoundresort/icon', component:IconComponent},
  {path:'summerveldhoundresort/album', component:AlbumComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
