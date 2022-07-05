import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppCommonService } from './@core/Services/app-common.service';
import { ConfirmationDialogParams, PopupDialogService } from './@core/Services/popup-dialog.service';
import { DialogComponent } from './@shared/components/dialog/dialog.component';
import { RateCaptureDialogComponent } from './@shared/components/rate-capture-dialog/rate-capture-dialog.component';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pjw-cal';
  calculateForm!: FormGroup;
  silverItemsObj: SilverItems | undefined;
  silverRate = 0;
  goldRate=0;
  silverWastageInpercent = 10;
  mcPerGramInRupees = 10;

  constructor(private readonly appService: AppCommonService,protected readonly popupService: PopupDialogService, ) {
    
  }


  ngOnInit(): void { 
    const currentDate = moment(new Date()).format('DD-MM-YYYY');
    const rateCapturedDate = localStorage.getItem('rateCapturedDate');
    const storedSivlerRate = Number(localStorage.getItem('silverRate'));
    const storedGoldRate = Number(localStorage.getItem('goldRate'));
    this.silverRate = storedSivlerRate === null ? 0 :  storedSivlerRate;
    this.goldRate = storedGoldRate === null ? 0 :  storedGoldRate;
    if(currentDate !== rateCapturedDate){
      this.openRateDialog();
    }    
        this.calculateForm =  new FormGroup({
          weightText: new FormControl('', [Validators.required])             
      });
  }

  updateRate(evt:any){
    evt.preventDefault();
    this.openRateDialog();
  }

  openRateDialog(){
    const dialogSettings = {
      width: '800px',
      height: '400px',
      data: {
          component: RateCaptureDialogComponent,
          showHeaderTitle: true,
          showActionBtn: true,
          showSaveBtn: true,
          showCancelBtn: false,
          cancelBtnLabel: 'Cancel',
          showEditButton: false,
          saveBtnLabel:'Submit',
          title: 'Rate',
          dialogDescription: 'Please enter silver and gold metal rate.',
          instantTranslate: false,
          showPopupCrossButton: false,
          errorMsgFromService: ''
      }
  };
  this.openDialog(dialogSettings);
  return;
  }

  openDialog(dialogSettings: ConfirmationDialogParams): void {
    this.appService.setDialogData(dialogSettings);

    this.popupService.openConfirmationDialog(
        DialogComponent,
        dialogSettings,
        (data) => {
            if (data) {
              console.log(data);
              this.silverRate = data.silverRate;
              this.goldRate = data.goldRate;
                //  this.snackBarService.displaySnackBar('call back');
            }
        },
        true
    );
}

addORUpdateArtefact() {
   console.log('submit');
}

  onCalculate(){
    if(this.calculateForm.valid){
      const itemWeight = Number(this.calculateForm.controls["weightText"].value);
      this.silverItemsObj = {} as SilverItems;

      const silverPergm = this.silverRate / 1000;
      this.silverItemsObj.silverWastage = itemWeight * this.silverWastageInpercent / 100;
      this.silverItemsObj.silverMc = itemWeight *  this.mcPerGramInRupees;

      this.silverItemsObj.silver450 = {} as Silver450;
      this.silverItemsObj.silver450.fancyPayalChain = 100;
      this.silverItemsObj.silver450.normalPayalChain = 100;



    }   

  }

}


export interface SilverItems {
  silver450:Silver450;
  silver550:Silver550;
  silver650:Sivler650;
  silverWastage:number;
  silverMc:number;
}

export interface Silver450 {
  normalPayalChain: number;
  fancyPayalChain:number;  
}

export interface SilverKada{
  gents:number;
  ladies:number;
  child:number;
}

export interface SilverKaalBale{  
  ladies:number;
  child:number;
}


export interface Silver550 {
  silverKada: SilverKada;
  silverKaalbale:SilverKaalBale;  
}


export interface Sivler650{
  sivlerPlate:number;
  sivlerDeepam:number;
}






