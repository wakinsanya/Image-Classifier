import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageClassifierComponent } from './image-classifier/image-classifier.component';
import { VideoClassifierComponent } from './video-classifier/video-classifier.component';
import { HeaderComponent } from './header/header.component';
import { PercentagePipe } from './percentage.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageClassifierComponent,
    VideoClassifierComponent,
    HeaderComponent,
    PercentagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
