import { MatDialog } from '@angular/material/dialog';
import { Injectable, Type } from '@angular/core';
import { take } from 'rxjs/operators';
import { SnackBarService } from './snack-bar.service';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class PopupDialogService {
    constructor(private readonly dialog: MatDialog, private readonly snackBarService: SnackBarService) {}

    openConfirmationDialog(
        dialogComp: Type<any>,
        dialogData: ConfirmationDialogParams,
        callbackFn?: (p: any, ...args: any[]) => void,
        isFormComponentInjected?: boolean,
        ...additionalParams: any[]
    ) {
        const defaultValues: any = {
            width: '450px',
            disableClose: false,
            data: {
                showActionBtn: true,
                text: dialogData.text,
                showSaveBtn: true,
                showCancelBtn: true
            }
        };

        const dialogRef = this.dialog.open(dialogComp, _.defaultsDeep(dialogData, defaultValues));

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((data) => {
                if (!data || !callbackFn) {
                    return;
                }

                if (isFormComponentInjected) {
                    callbackFn(data, ...additionalParams);
                    return;
                }
                data.status !== FORM_STATUS.INVALID ? callbackFn(data, ...additionalParams) : this.snackBarService.displaySnackBar();
            });
    }
}


export enum FORM_STATUS {
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export interface ConfirmationDialogParams {
    width?: string;
    disableClose?: boolean;
    data?: ConfirmationDialogData;
    text?: string;
}


export interface ConfirmationDialogData {
    text?: string;
    title?: string;
    [attr: string]: any;
}
