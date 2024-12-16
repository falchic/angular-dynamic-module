import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '@core/components/error-dialog/error-dialog.component';
import { ErrorData, ErrorService } from '@core/services/error.service';
import { EMPTY, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private ngUnsubscribe = new Subject();

  constructor(private errorService: ErrorService, public dialog: MatDialog) {
    this.initializeErrors();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(EMPTY);
    this.ngUnsubscribe.complete();
  }

  private initializeErrors() {
    this
      .errorService
      .getErrors()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((error) => {
        this.openDialog(error);
      });
  }

  openDialog(error: ErrorData) {
    this.dialog.open(ErrorDialogComponent, {
      data: error,
      panelClass: "error-dialog"
    });
  }

}
