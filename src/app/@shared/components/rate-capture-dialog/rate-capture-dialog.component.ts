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
  category_Apercent = 0.693;
  category_Bpercent = 0.847;
  category_Cpercent = 1;

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
    const silverRateVal = Number(this.rateCaptureForm.controls["Silver_Rate"].value);
    const goldRateVal = Number(this.rateCaptureForm.controls["Gold_Rate"].value);
  
    localStorage.setItem('silverRate',String(silverRateVal));
    localStorage.setItem('goldRate',String(goldRateVal));
    this._data.silverRate = silverRateVal;
    this._data.goldRate = goldRateVal;

    const currentDate = moment(new Date()).format('DD-MM-YYYY');
    localStorage.setItem('rateCapturedDate',currentDate);

    const category_A = Math.round(this.category_Apercent * silverRateVal / 100);
    const category_B = Math.round(this.category_Bpercent * silverRateVal / 100);
    const category_C = Math.round(this.category_Cpercent * silverRateVal / 100);

    localStorage.setItem('category_A',String(category_A));
    localStorage.setItem('category_B',String(category_B));
    localStorage.setItem('category_C',String(category_C));
    

    this.snackBarService.displaySnackBar('Gold/Silver rates are updated successfully');    
  
    this.dialogRef.close(this._data);
 } 
}

}
