
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeAuthService } from '../fake-auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: FakeAuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required,]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }

  login() {
    this.authService.login(this.form.value.email, this.form.value.password).subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/grid']);
      } else {
        alert('Invalid credentials');
      }
    });
}

}
