import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumComponent } from './Components/album/album.component';
import { ContentComponent } from './Components/content/content.component';
import { DoggoComponent } from './Components/doggo/doggo.component';
import { IconComponent } from './Components/icon/icon.component';
import { LifeEventComponent } from './Components/life-event/life-event.component';

const routes: Routes = [
  {path:'', component:DoggoComponent},
  {path:'summerveldhoundresort/doggo', component:DoggoComponent},
  {path:'summerveldhoundresort/lifeevent', component:LifeEventComponent},
  {path:'summerveldhoundresort/icon', component:IconComponent},
  {path:'summerveldhoundresort/album', component:AlbumComponent}, 
  {path:'summerveldhoundresort/content', component:ContentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
