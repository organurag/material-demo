import { Component, inject, OnInit, Output, output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DataService, User } from '../data.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})


export class RegisterComponent {
  @Output() form: Form;
  user: User;

  constructor(private fb: FormBuilder) {
    this.user = new User();
   }
   dataService: DataService = inject(DataService);
   router: Router = inject(Router);
   selected = 'Security Answer'
   

  

  
    userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      securityQuestion: ['', Validators.required],
      selected: [''],
      education: this.fb.group({
        tenth: false,
        twelfth: false,
        btech: false,
        mtech: false
      })
    });

  onSubmit(){
  

    this.user.name = this.userForm.value.name;
    this.user.email = this.userForm.value.email;
    this.user.gender = this.userForm.value.gender;
    this.user.password = this.userForm.value.password;
    this.user.selected = this.userForm.value.selected;
    this.user.securityQuestion = this.userForm.value.securityQuestion;
    this.user.education.btech = this.userForm.value.education.btech;  
    this.user.education.mtech = this.userForm.value.education.mtech;
    this.user.education.tenth = this.userForm.value.education.tenth;
    this.user.education.twelfth = this.userForm.value.education.twelfth;

    this.dataService.setUser(this.user);

    this.userForm.reset(); 

    this.router.navigate(['userShow']);
  }

  
 

}
 