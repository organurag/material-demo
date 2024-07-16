

import { Component, forwardRef, Input, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl, ValidationErrors, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FillDetailsDialogComponent } from '../fill-details-dialog/fill-details-dialog.component';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Input() control: FormControl;

  value: string = '';
  isDisabled: boolean = false;

  private tabPressed: boolean = false;
  validated: boolean = false;
  private focused: boolean = false;
  private blured: boolean = false;

  constructor(private dialog: MatDialog) {}

  onChange = (value: any) => {};
  onTouched = () => {};

  updateValue(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.control.setValue(value);

  }

  writeValue(value: string): void {
    this.value = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    console.log( this.control.errors);
    return this.control.errors;

  }


  handleKeyDown(event: any) {
    if (event.key == 'Tab') {
      if(this.validated == false && (this.control.getError('email') || this.control.getError('required')))
      {
        this.dialog.open(FillDetailsDialogComponent);

      }
      else{
        this.validated = true
      }
      // if((!this.control.getError('email') && !this.control.getError('required')))
      // {
      //   this.validated = true
      // }
    }
  }


  handleMouseDown(event: MouseEvent) {
    this.validated = true;
    console.log('mouse pressed')
  }


  // @HostListener('focus', ['$event'])
  // handleFocus(event: FocusEvent) {
  //   if (this.tabPressed && !this.mouseDown) {
  //     this.dialog.open(FillDetailsDialogComponent);
  //     this.tabPressed = false;

  //   }
  //   this.mouseDown = false;

  // }



}

