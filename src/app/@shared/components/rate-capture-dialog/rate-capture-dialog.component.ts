import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/@core/Services/snack-bar.service';
import { DialogComponent } from '../dialog/dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-rate-capture-dialog',
  templateUrl: './rate-capture-dialog.component.html',
  styleUrls: ['./rate-capture-dialog.component.scss']
})
export class RateCaptureDialogComponent implements OnInit {
  rateCaptureForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public readonly _data: any,
   public readonly dialogRef: MatDialogRef<DialogComponent>,
   private readonly snackBarService: SnackBarService) {}

  ngOnInit(): void {
    console.log(this._data);
    this.initializeForm();
  }

  initializeForm(){
    const sivlerRate = localStorage.getItem('silverRate');
    const goldRate = localStorage.getItem('goldRate');
    this.rateCaptureForm = new FormGroup({
      Silver_Rate: new FormControl( (sivlerRate === null ? '' :  sivlerRate),[Validators.required]),
      Gold_Rate: new FormControl((goldRate === null ? '' :  goldRate),[Validators.required])      
  });
  }

  nopaste() {
    return false;
}

  numberandDecimal(event: { which: any; keyCode: any; }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode === 46) {
        return true;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

  get getRateControl() {
    try {
        return this.rateCaptureForm?.controls;
    } catch (ex) {
        console.log('###ERROR###: ' + ex);
        return null;
    }
}

addORUpdateArtefact(){
 // this._data.customData.isProceedclicked = true;

 if(this.rateCaptureForm.valid){
    const silverRateVal = this.rateCaptureForm.controls["Silver_Rate"].value;
    const goldRateVal = this.rateCaptureForm.controls["Gold_Rate"].value;
  
    localStorage.setItem('silverRate',silverRateVal);
    localStorage.setItem('goldRate',goldRateVal);
    this._data.silverRate = silverRateVal;
    this._data.goldRate = goldRateVal;

    const currentDate = moment(new Date()).format('DD-MM-YYYY');
    localStorage.setItem('rateCapturedDate',currentDate);
    this.snackBarService.displaySnackBar('Gold/Silver rates are updated successfully');    
  
    this.dialogRef.close(this._data);
 } 
}

}
