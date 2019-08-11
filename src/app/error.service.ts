import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  displayError(
    msg = 'Something went wrong, please try again.',
    duration = 3000
  ) {
    this.snackBar.open(msg, 'Error', { duration });
  }

}
