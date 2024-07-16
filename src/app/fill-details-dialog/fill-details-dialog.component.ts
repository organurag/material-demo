import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fill-details-dialog',
  templateUrl: './fill-details-dialog.component.html',
  styleUrls: ['./fill-details-dialog.component.css']
})
export class FillDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
