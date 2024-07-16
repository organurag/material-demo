import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeAuthService } from './fake-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: FakeAuthService, private router: Router) {
    window.addEventListener('storage', this.syncLogout.bind(this));
  }

  ngOnInit() {
    this.form = this.fb.group({
      customInput: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    }
  }


   


  syncLogout(event: StorageEvent) {
    if (event.key === 'auth_token' && event.newValue === null) {
      this.router.navigate(['/login']);
    }
}
}
