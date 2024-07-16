import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user-service.service';
import { PageEvent } from '@angular/material/paginator';

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
  displayedColumns = [,'id', 'name', 'username', 'email'];
  totalPage;
  dataSource = new MatTableDataSource<any>();

  pageSize = 3;

  

  loadUsers(pageIndex: number = 1, pageSize: number = this.pageSize){
    this.userService.getUsers(pageIndex,pageSize).subscribe((res) => {
      this.dataSource.data = res.data;
      this.totalPage = res.total;
      console.log(res);
    })
  }

  onPageChange(event: PageEvent){
    this.pageSize = event.pageSize+1;
    this.loadUsers(event.pageIndex+1, event.pageSize);
    console.log(event.pageIndex, event.pageSize)
  }
}

