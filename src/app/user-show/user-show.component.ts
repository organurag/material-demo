import { Component, inject, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { DataService, User } from '../data.service';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrl: './user-show.component.css'
})
export class UserShowComponent implements OnInit {

  dataService: DataService = inject(DataService);

  user: User;
  

  ngOnInit(): void {  
   this.user = this.dataService.getUser()

    console.log(this.user);
  }  
}
