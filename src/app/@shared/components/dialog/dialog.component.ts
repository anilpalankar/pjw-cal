import { Component, ComponentFactoryResolver, ComponentRef, Inject, NgZone, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent  implements OnInit, OnDestroy {
  dialogData: any;
  isEditButton = false;
  showHeaderTitle = false;
  @ViewChild('componentPlaceHolder', { read: ViewContainerRef, static: true })
  vcRef: ViewContainerRef | undefined;
  componentRef: ComponentRef<any> | undefined;
  isEditMode = false;

  constructor(
      public readonly dialogRef: MatDialogRef<DialogComponent>,
      private readonly resolver: ComponentFactoryResolver,
      @Inject(MAT_DIALOG_DATA) public data: any,
      // private readonly appService: AppCommonService,
      private readonly zone: NgZone
  ) {
      console.log(data);
      this.dialogData = data;
  }

  ngOnInit() {
      const createComponent = this.resolver.resolveComponentFactory(this.data.component);
      this.componentRef = this.vcRef?.createComponent(createComponent);
  }

  ngOnDestroy() {
      if (this.componentRef) {
          this.componentRef.destroy();
      }
  }

  onSaveClick(): void {
      typeof this.componentRef?.instance.addORUpdateArtefact === 'function' && this.componentRef.instance.addORUpdateArtefact();
  }

  onCancelClick() {
      this.zone.run(() => this.dialogRef.close(this.dialogData));
  }

}
