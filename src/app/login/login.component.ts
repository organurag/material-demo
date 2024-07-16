import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FakeAuthService } from '../fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  form: FormGroup;

  constructor(private fb: FormBuilder,private authService: FakeAuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      customInput: ['', [Validators.required, Validators.email]],
      anotherInput: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }


  login() {
    this.authService.login(this.form.value.customInput, this.form.value.anotherInput).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/grid']);
      } else {
        alert('Invalid credentials');
      }
    });
}


}