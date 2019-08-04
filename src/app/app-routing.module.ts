import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoClassifierComponent } from './video-classifier/video-classifier.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'classifier/image',
    component: ImageClassifierComponent
  }, {
    path: 'classifier/video',
    component: VideoClassifierComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
