import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserShowComponent } from './user-show/user-show.component';
import { FormComponent } from './form/form.component';
import { GridComponent } from './grid/grid.component';
import { AuthGuard } from './auth-guard';
import { TableGridComponent } from './table-grid/table-grid.component';
import { ScrollableComponent } from './scrollable/scrollable.component';
import { HttpGridComponent } from './http-grid/http-grid.component';

const routes: Routes = [
  {
    path: 'login', component: FormComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'userShow', component: UserShowComponent
  },
  {
    path: 'grid', component: GridComponent, canActivate: [AuthGuard]
  },
  {
    path: 'table-grid',component: TableGridComponent
  },
  {
    path: 'scrolable', component: ScrollableComponent
  },
  {
    path: 'http-grid', component: HttpGridComponent
  },
  {
    path: '', redirectTo: '/grid', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
