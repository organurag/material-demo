import { Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';

export class User {
  email: string;
  name: string;
  password: string;
  gender: string;
  securityQuestion: string;
  selected: string;
  education: {
    tenth: boolean,
    twelfth: boolean,
    btech: boolean,
    mtech: boolean
  };

  constructor() {
    this.email = '';
    this.name = '';
    this.password = '';
    this.gender = '';
    this.securityQuestion = '';
    this.selected = '';
    this.education = {
      tenth: false,
      twelfth: false,
      btech: false,
      mtech: false
    };
  }
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  User: User;


  constructor() { }

  setUser(user: User){
    this.User = user;
  }

  getUser(){
    return this.User;
  }

}
