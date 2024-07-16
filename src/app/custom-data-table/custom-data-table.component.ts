import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.css']
})
export class CustomDataTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() totalRecords = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize = 5;
  
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => this.pageChange.emit(event));
    this.sort.sortChange.subscribe((sortState: Sort) => this.sortChange.emit(sortState));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
