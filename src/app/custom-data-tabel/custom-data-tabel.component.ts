import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, matSortAnimations } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-custom-data-tabel',
  templateUrl: './custom-data-tabel.component.html',
  styleUrl: './custom-data-tabel.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CustomDataTabelComponent implements AfterViewInit, OnInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource = new MatTableDataSource<any>();
  @Input() totalPage = 0;
  @Input() dropdownOptions: { [key: string]: any[] } = {};
  @Input() radioOptions: { [key: string]: any[] } = {};
  @Output() pageChange = new EventEmitter();
  @Output() Add = new EventEmitter();
  @Output() Edit = new EventEmitter();
  @Output() Delete = new EventEmitter();
  @Output() BulkDelete = new EventEmitter();

  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  selection = new SelectionModel<any>(true, []);
  EditColumn;
  isEdit = false;
  isAdd = false;
  displayNames = ['select'];
  columnsToDisplayWithExpand = [...this.displayNames, 'expand'];
  expandedElement: UserModel;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChildren('footerValue') footerValue;
  @ViewChildren('EditValue') EditValue;
  @ViewChild('dropDownValue') dropDownValue: MatSelect;

  ngOnInit(): void {
    this.displayNames = this.displayNames.concat(this.displayedColumns);
    this.displayNames.push('Actions');
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.paginator.page.subscribe((event: PageEvent) =>
      this.pageChange.emit(event)
    );
    this.paginator.pageSize = this.pageSize;
  }

  onpagechan() {
    this.pageChange.emit(this.paginator);
    this.applyFilter;
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  onEdit(event) {
    this.isEdit = true;
    this.EditColumn = event.id;
  }

  onAddRow() {
    this.isAdd = true;
  }

  onEditSave(row) {
    const EditValues: { [key: string]: string } = {};
    this.EditValue.forEach((input) => {
      const column = input.nativeElement.getAttribute('data-column');
      EditValues[column] = input.nativeElement.value;
      
    });
    this.Edit.emit(EditValues);

    this.isEdit = false;
    this.EditColumn = undefined;

    const selectedOption = this.dropDownValue.selected as any;
    const cddvalue = this.dropDownValue.value;
    const customAttribute = selectedOption._getHostElement().getAttribute('data-column');
    console.log('Custom attribute:', customAttribute);
  }

  onDelete(row) {
    confirm('do You want to delete record with name: ' + row.name);
    this.Delete.emit(row.id);
    this.onpagechan();
  }

  bulkDelete() {
    const selectedIds = this.selection.selected.map((row) => row.id);
    console.log(selectedIds);
    this.BulkDelete.emit(selectedIds);
  }

  onAdd(row) {
    const footerValues: { [key: string]: string } = {};

    this.footerValue.forEach((input) => {
      const column = input.nativeElement.getAttribute('data-column');
      footerValues[column] = input.nativeElement.value;
    });
    console.log('Footer values:', footerValues);
    if (footerValues.name != '') {
      this.Add.emit(footerValues);
    } else {
      alert('field is empty');
    }

    this.footerValue.forEach((input) => {
      input.nativeElement.value = '';
    });

    this.isAdd = false;
  }
}
