import { Component, DoCheck } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck{
  isLogged;
  user;
 
  constructor(private authService: FakeAuthService, private router: Router){
   
  }
  ngDoCheck(): void {
    this.isLogged =  this.authService.isLoggedIn()
    this.user = JSON.parse(this.authService.getName())
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    
  }


}
