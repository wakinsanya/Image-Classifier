import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { from, Subscription } from 'rxjs';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-image-classifier',
  templateUrl: './image-classifier.component.html',
  styleUrls: ['./image-classifier.component.scss']
})
export class ImageClassifierComponent implements OnInit, OnDestroy {
  public imageSource: string;
  public model: mobilenet.MobileNet;
  public predictions: Array<{ className: string, probability: number }> = [];
  public subscriptions$: Array<Subscription> = [];
  @ViewChild('userImage', { static: false }) userImageRef: ElementRef;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.subscriptions$.push(
      from(mobilenet.load())
        .subscribe({
          next: (data: mobilenet.MobileNet) => this.model = data,
          error: () => this.errorService.displayError()
        })
    );
  }

  onFileSelected($event) {
    const file = $event.target.files[0] as File;
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.imageSource = fileReader.result as string;
        setTimeout(() => {
          this.subscriptions$.push(
            from(this.model.classify(this.userImageRef.nativeElement))
              .subscribe({
                next: data => this.predictions = data,
                error: () => this.errorService.displayError()
              })
          );
        });
      };
    }
  }

  cleanup() {
    this.imageSource = undefined;
    this.predictions = [];
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(sub$ => {
      if (sub$) {
        sub$.unsubscribe();
      }
    });
  }
}
