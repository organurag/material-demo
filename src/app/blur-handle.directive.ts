import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { FillDetailsDialogComponent } from './fill-details-dialog/fill-details-dialog.component';

@Directive({
  selector: '[appBlurHandler]'
})
export class BlurHandlerDirective {
  @Output() dialogeStatus = new EventEmitter();
  @Input() control: FormControl;
  private dialogOpen = false;
  private tabPressed = false;

  constructor(private dialog: MatDialog, private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  handleTab(event: KeyboardEvent) {
    if(event.key === 'Tab'){
      this.tabPressed = true;
    if (this.control && this.control.errors && !this.dialogOpen) {
      event.preventDefault();
      this.openDialog();
      this.tabPressed = false;
    }
    }
  }

  @HostListener('blur', ['$event'])
  handleBlur(event: FocusEvent) {
    if (this.tabPressed && this.control && this.control.invalid && !this.dialogOpen) {
      this.openDialog();
    }
    this.tabPressed = false;
  }

  @HostListener('mousedown')
  handleMouseDown() {
    this.tabPressed = false;
  }

  private openDialog() {
    console.log(this.control.errors);
    this.dialogOpen = true;
    this.dialogeStatus.emit(this.dialogOpen);
    const dialogRef = this.dialog.open(FillDetailsDialogComponent, {
      data: { errors: this.control.errors }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.dialogOpen = false;
      this.el.nativeElement.focus();
      this.dialogeStatus.emit(this.dialogOpen);
    });
  }
}
