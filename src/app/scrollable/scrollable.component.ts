import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user-service.service';
import { PageEvent } from '@angular/material/paginator';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrl: './scrollable.component.css'
})
export class ScrollableComponent implements AfterViewInit{
  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.loadUsers();
  }
  displayedColumns = ['id', 'name', 'username', 'email', 'city', 'gender'];
  totalPage;
  dataSource = new MatTableDataSource<any>();
  user: UserModel = new UserModel();
  pageSize = 5;
  pageIndex;
  response;

  dropdownOptions: { [key: string]: any[] } = {
    city: ['Hyderabad', 'Mumbai', 'Pune','Solapur']
  };

  radioOptions: {[key: string]: any[]} = {
    gender: ['Male', 'Female']
  }  

  loadUsers(pageIndex: number = 1, pageSize: number = this.pageSize){
    this.pageIndex = pageIndex
    this.userService.getUsers(pageIndex,pageSize).subscribe((res) => {
      this.dataSource.data = res.data.data;
      this.totalPage = res.data.items;
    })
  }

  addUser(event){
    if(event.name !== ""){
    this.user.id = event.id;
    this.user.email = event.email;
    this.user.username = event.username;
    this.user.name = event.name;
    this.user.city = event.city;
    this.user.gender = event.gender;
    this.userService.addUsers(this.user).subscribe(() => {
      this.loadUsers(this.pageIndex + 1, this.pageSize);
    } );
    }

    
  }

  EditUser(event){
    this.user.id = event.id;
    this.user.email = event.email;
    this.user.username = event.username;
    this.user.name = event.name;
    this.user.city = event.city;
    this.user.gender = event.gender;
    this.userService.updateItem(this.user.id, this.user).subscribe(() => {
      this.loadUsers(this.pageIndex, this.pageSize);
    } );
  }

  Delete(id){
    this.userService.deleteItem(id).subscribe(() => {
      this.loadUsers(this.pageIndex, this.pageSize);
    } );
  }

  bulkDelete(ids: number[]){
    for(let i = 0; i < ids.length; i++)
    {
      this.Delete(ids[i]);
      
    }
  }

  onPageChange(event){
    this.pageSize = event.pageSize+1;
    this.loadUsers(event.pageIndex+1, event.pageSize);
    
  }
}

