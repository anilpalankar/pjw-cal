import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmation-snack-bar',
  templateUrl: './confirmation-snack-bar.component.html',
  styleUrls: ['./confirmation-snack-bar.component.scss']
})
export class ConfirmationSnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: any) {}

  ngOnInit(): void {
  }

}
