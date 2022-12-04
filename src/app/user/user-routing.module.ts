import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersPostComponent } from './users-post/users-post.component';
import { UserEditComponent } from './user-edit/user-edit.component';
const routes: Routes = [
  { 
    path: '',
    component: HomeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent },
      { path: 'edit/:id', component: UserEditComponent },
      { path: 'users-post', component: UsersPostComponent },
      {path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
