import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationSnackBarComponent } from '../../@shared/components/confirmation-snack-bar/confirmation-snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    constructor(private readonly snackBar: MatSnackBar) {}

    displaySnackBar(message: string = 'Your Information has been saved') {
        this.snackBar.openFromComponent(ConfirmationSnackBarComponent, {
            data: message,
            duration: 7000,
            verticalPosition: 'bottom'
        });
    }

    displaySnackBarDynamicPosition(message: string = 'Your Information has been saved', horizontal: any, vertical: any) {
        this.snackBar.openFromComponent(ConfirmationSnackBarComponent, {
            data: message,
            duration: 7000,
            verticalPosition: vertical,
            horizontalPosition: horizontal
        });
    }
}
