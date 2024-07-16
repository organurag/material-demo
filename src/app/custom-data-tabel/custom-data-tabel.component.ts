import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, matSortAnimations } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-custom-data-tabel',
  templateUrl: './custom-data-tabel.component.html',
  styleUrl: './custom-data-tabel.component.css'
})
export class CustomDataTabelComponent implements AfterViewInit {

@Input() displayedColumns: string[] = [];
@Input() dataSource = new MatTableDataSource<any>();
@Input() totalPage = 0;
@Output() pageChange = new EventEmitter();

pageSize= 3;
pageSizeOptions = [3,6]
selection = new SelectionModel<any>(true, []);

@ViewChild(MatSort) sort: MatSort;
@ViewChild(MatPaginator) paginator : MatPaginator;

ngAfterViewInit(): void {
 this.dataSource.sort = this.sort;
 this.paginator.page.subscribe((event: PageEvent) => this.pageChange.emit(event));
 this.paginator.pageSize = this.pageSize;
 
}

applyFilter(value: string) {
  this.dataSource.filter = value.trim().toLowerCase();
}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
toggleAllRows() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSource.data);
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


}


