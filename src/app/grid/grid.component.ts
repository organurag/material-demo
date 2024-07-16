import { Component } from '@angular/core';
import { FakeAuthService } from '../fake-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {

  tiles = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 3, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 4, color: '#DDBDF1'},
    {text: 'five', cols: 1, rows: 5, color: 'lightblue'},
    {text: 'six', cols: 1, rows: 6, color: 'lightgreen'},
    {text: 'seven', cols: 1, rows: 7, color: 'lightpink'},
    {text: 'eight', cols: 1, rows: 8, color: '#DDBDF1'},
  
  ];


  
}
