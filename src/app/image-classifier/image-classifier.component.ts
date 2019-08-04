import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { from } from 'rxjs';

@Component({
  selector: 'app-image-classifier',
  templateUrl: './image-classifier.component.html',
  styleUrls: ['./image-classifier.component.scss']
})
export class ImageClassifierComponent implements OnInit {
  public imageSource: string;
  public model: mobilenet.MobileNet;
  public predictions: Array<{ className: string, probability: number }> = [];
  @ViewChild('userImage', { static: false }) userImageRef: ElementRef;

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    from(mobilenet.load())
      .subscribe({
        next: (data: mobilenet.MobileNet) => {
          this.model = data;
        },
        error: err => {
          this.showError();
        }
      });
  }

  onFileSelected($event) {
    const file = $event.target.files[0] as File;
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = () => {
        this.imageSource = fileReader.result as string;
        setTimeout(() => {
          from(this.model.classify(this.userImageRef.nativeElement))
            .subscribe({
              next: data => {
                this.predictions = data;
              },
              error: err => {
                this.showError();
              }
            });
        });
      };
    }
  }

  cleanup() {
    this.imageSource = undefined;
    this.predictions = [];
  }

  showError() {
    this.snackBar.open(
      'Something went wrong, please try again.',
      'Error',
      { duration: 3000 }
    );
  }

}
