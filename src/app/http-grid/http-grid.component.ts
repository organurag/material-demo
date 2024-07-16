
import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../services/user-service.service';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
  selector: 'app-http-grid',
  templateUrl: './http-grid.component.html',
  styleUrl: './http-grid.component.css'
})
export class HttpGridComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'name', 'username', 'email'];
  dataSource = new MatTableDataSource<any>();
  totalUsers = 0;
  
  pageSize = 5;

  pageSizeOptions = [5,10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.paginator.pageSize = this.pageSize;
    this.paginator.page.subscribe((event: PageEvent) => this.loadUsers(event.pageIndex + 1, event.pageSize));
    this.loadUsers();
  }

  loadUsers(pageIndex: number = 1, pageSize: number = this.pageSize): void {
    this.userService.getUsers(pageIndex, pageSize).subscribe(response => {
      this.dataSource.data = response.data;
      this.totalUsers = response.total;
      console.log('Total Users:', this.totalUsers);
      console.log('Page Size Options:', this.pageSizeOptions);
    });
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
  
}


// export class HttpGridComponent implements AfterViewInit{
//   displayedColumns: string[] = ['id', 'name', 'username', 'email'];
//   dataSource = new MatTableDataSource<any>();
//   totalRecords = 0;
//   pageSize = 10;

//   constructor(private userService: UserService) {}
//   ngAfterViewInit(): void {
//     this.loadUsers(1, this.pageSize);
//   }

//   ngOnInit(): void {
   
//   }

//   loadUsers(pageIndex: number, pageSize: number, sortField?: string, sortDirection?: string): void {
//     this.userService.getUsers(pageIndex, pageSize).subscribe(response => {
//       this.dataSource.data = response.data;
//       this.totalRecords = response.total;
//     });
//   }

//   onPageChange(event: PageEvent) {
//     this.pageSize = event.pageSize;
//     this.loadUsers(event.pageIndex, event.pageSize);
//   }

//   onSortChange(sortState: Sort) {
//     const sortField = sortState.active;
//     const sortDirection = sortState.direction;
//     this.loadUsers(0, this.pageSize, sortField, sortDirection);
//   }
// }