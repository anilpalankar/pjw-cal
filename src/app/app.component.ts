import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pjw-cal';
  calculateForm!: FormGroup;
  silverItemsObj: SilverItems | undefined;
  silverRate = 65000;
  silverWastageInpercent = 10;
  mcPerGramInRupees = 10;

  constructor( ) {
    
  }


  ngOnInit(): void { 
        this.calculateForm =  new FormGroup({
          weightText: new FormControl('', [Validators.required])             
      });
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






