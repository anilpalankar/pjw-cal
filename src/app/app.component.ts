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
  categoryApercent = 0.693;
  categoryBpercent = 0.847;
  categoryCpercent = 1;
  category_A = 0;
  category_B = 0;
  category_C = 0;

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
if(localStorage.getItem('category_A') !== null){
  this.category_A = Number(localStorage.getItem('category_A'));
  this.category_B = Number(localStorage.getItem('category_B'));
  this.category_C = Number(localStorage.getItem('category_C'));
}
      
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
              this.category_A = Number(localStorage.getItem('category_A'));
              this.category_B = Number(localStorage.getItem('category_B'));
              this.category_C = Number(localStorage.getItem('category_C'));
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
      const totalSilverWeight = itemWeight + this.silverItemsObj.silverWastage;      

// CATEGORY A
      this.silverItemsObj.silver450 = {} as Silver450;      
   
      this.silverItemsObj.silver450.fancyPayalChain = {} as Price;
      this.silverItemsObj.silver450.fancyPayalChain.actialPrice = totalSilverWeight + this.category_A + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver450.fancyPayalChain.sellingPrice =  totalSilverWeight + this.category_A + this.silverItemsObj.silverMc;;
      this.silverItemsObj.silver450.fancyPayalChain.profit = this.silverItemsObj.silver450.fancyPayalChain.sellingPrice - this.silverItemsObj.silver450.fancyPayalChain.actialPrice;
      
      this.silverItemsObj.silver450.normalPayalChain = {} as Price;
      this.silverItemsObj.silver450.normalPayalChain.actialPrice = totalSilverWeight + this.category_A + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver450.normalPayalChain.sellingPrice =  totalSilverWeight + this.category_A + this.silverItemsObj.silverMc;;
      this.silverItemsObj.silver450.normalPayalChain.profit = this.silverItemsObj.silver450.normalPayalChain.sellingPrice - this.silverItemsObj.silver450.normalPayalChain.actialPrice;
      

// CATEGORY B
      this.silverItemsObj.silver550 = {} as Silver550;

      this.silverItemsObj.silver550.silverKada = {} as SilverKada;
      this.silverItemsObj.silver550.silverKada.child = {} as Price;

      this.silverItemsObj.silver550.silverKada.child.actialPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.child.sellingPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.child.profit = this.silverItemsObj.silver550.silverKada.child.sellingPrice - this.silverItemsObj.silver550.silverKada.child.actialPrice;

      this.silverItemsObj.silver550.silverKada.gents = {} as Price;

      this.silverItemsObj.silver550.silverKada.gents.actialPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.gents.sellingPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.gents.profit = this.silverItemsObj.silver550.silverKada.gents.sellingPrice - this.silverItemsObj.silver550.silverKada.gents.actialPrice;

      this.silverItemsObj.silver550.silverKada.ladies = {} as Price;

      this.silverItemsObj.silver550.silverKada.ladies.actialPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.ladies.sellingPrice = totalSilverWeight + this.category_B + this.silverItemsObj.silverMc;
      this.silverItemsObj.silver550.silverKada.ladies.profit = this.silverItemsObj.silver550.silverKada.ladies.sellingPrice - this.silverItemsObj.silver550.silverKada.ladies.actialPrice;

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
  normalPayalChain: Price;
  fancyPayalChain:Price;  
}

export interface Price{
  sellingPrice:number;
  actialPrice:number;
  profit:number;
}

export interface SilverKada{
  gents:Price;
  ladies:Price;
  child:Price;
}

export interface SilverKaalBale{  
  ladies:Price;
  child:Price;
}


export interface Silver550 {
  silverKada: SilverKada;
  silverKaalbale:SilverKaalBale;  
}


export interface Sivler650{
  sivlerPlate:number;
  sivlerDeepam:number;
}






