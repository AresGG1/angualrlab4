import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationComponent} from "../components/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  private notificationSubject = new Subject<string>();

  showSuccess(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      panelClass: ['success-snackbar'],
      data: {
        message,
        icon: "done"
      },
    });
  }

  showError(message: string) {
    const snackBarRef = this.snackBar.openFromComponent(NotificationComponent, {
      duration: 3000,
      panelClass: ['error-snackbar'],
      data: {
        message,
        icon: "done"
      },
    });
  }



}
