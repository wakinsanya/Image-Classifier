import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { ErrorService } from '../error.service';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-video-classifier',
  templateUrl: './video-classifier.component.html',
  styleUrls: ['./video-classifier.component.scss']
})
export class VideoClassifierComponent implements AfterViewInit, OnDestroy {
  @ViewChild('userVideo', { static: false }) userVideoRef: ElementRef;
  public model: mobilenet.MobileNet;
  public predictions: Array<{ className: string, probability: number }> = [];
  public isInitializing = true;
  public subscriptions$: Array<Subscription> = [];

  constructor(private errorService: ErrorService) { }

  ngAfterViewInit() {
    this.subscriptions$.push(
      from(mobilenet.load())
        .pipe(
          concatMap((data: mobilenet.MobileNet) => {
            this.model = data;
            return from(navigator.mediaDevices.getUserMedia({ video: true }));
          })
        ).subscribe({
          next: (stream: MediaStream) => {
            this.isInitializing = false;
            this.userVideoRef.nativeElement.srcObject = stream;
            setInterval(() => {
              this.classifyVideoStream();
            }, 4000);
          },
          error: () => this.errorService.displayError()
        })
    );
  }

  classifyVideoStream() {
    this.subscriptions$.push(
      from(this.model.classify(this.userVideoRef.nativeElement))
        .pipe(
          concatMap(data => {
            this.predictions = data;
            return tf.nextFrame();
          }),
          catchError(() => {
            this.errorService.displayError();
            return tf.nextFrame();
          })
        ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(sub$ => {
      if (sub$) {
        sub$.unsubscribe();
      }
    });
  }
}
