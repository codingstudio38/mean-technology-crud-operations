import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserheaderComponent } from './userheader/userheader.component';
import { UsersPostComponent } from './users-post/users-post.component';
import { UserEditComponent } from './user-edit/user-edit.component';
@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UserheaderComponent,
    UsersPostComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UserModule { }
