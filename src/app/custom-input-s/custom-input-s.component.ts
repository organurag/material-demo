import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input-s',
 templateUrl: './custom-input-s.component.html',
   styleUrls: ['./custom-input-s.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputSComponent),
      multi: true
    }
  ]
})
export class CustomInputSComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Input() control: FormControl;

  dialoge;

  openErrors(dialogOpen: boolean){
    this.dialoge = dialogOpen;
  }

  ngOnInit() {
    if (!this.control) {
      this.control = new FormControl();
    }
  }

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  
}
