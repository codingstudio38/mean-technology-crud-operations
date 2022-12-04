import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.css']
})
export class UsersPostComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.tokenVerify(false);
    if (this.APIservice.checkuserIsloggedin()) {
      this.UsersPost(this.page, this.limit);
    }
    $(document).ready(() => {
      document.title = "MEAN Technology || Users - Post";
    });


  }

  USER_DETAILS: any = this.APIservice.loginuserDetails();

  tokenVerify(alertis: boolean) {
    if (this.APIservice.checkuserIsloggedin()) {
      return true;
    } else {
      if (alertis) {
        alert("Unauthorized. Please Login.");
      }
      window.localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  pageChangeEvent(event: number) {
    this.page = event;
    this.UsersPost(this.page, this.limit);
  }
  setLimit(l: any) {
    this.limit = l;
    this.UsersPost(1, l);
  }
  limit_list: any;
  page: number = 1;
  limit: number = 5;
  message: any;
  apibody: any;
  records: any[] = [];
  currentPage: any;
  totalRecords: any;
  pagingCounter: any;
  checkNo: any;
  UsersPost(p: number, l: number) {
    this.tokenVerify(true);
    this.APIservice.ForUsersPost(p, l).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.Sent:
          //console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          //console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:

          break;
        case HttpEventType.Response:
          this.apibody = response.body;
          if (this.apibody.status == 200) {
            this.records = [];
            this.currentPage = this.apibody.list.page;
            this.totalRecords = this.apibody.list.totalDocs;
            this.pagingCounter = this.apibody.list.pagingCounter;
            this.checkNo = this.pagingCounter+this.apibody.list.docs.length-1;
            const data = this.apibody.list.docs;
            data.forEach((item: any, key: any) => { 
              this.records.push({ '_id': item._id, 'content': item.content, 'userid': item.userid, 'title': item.title, 'type': item.type,'user_name': item.user_field.name, 'slno': this.pagingCounter++, 'updated_at': item.updated_at, 'created_at': item.created_at, '__v': item.__v });
            });
            if (this.totalRecords <= 5) {
              this.limit_list = [5];
            } else if (this.totalRecords <= 10) {
              this.limit_list = [5, 10];
            } else if (this.totalRecords <= 25) {
              this.limit_list = [5, 10, 25];
            } else if (this.totalRecords <= 50) {
              this.limit_list = [5, 10, 25, 50];
            } else if (this.totalRecords <= 100) {
              this.limit_list = [5, 10, 25, 50, 100];
            } else {
              this.limit_list = [5, 10, 25, 50, 100];
            }
          } else {
            alert(this.apibody.message);
          }
      }
    });
  }



  DeleteUser(id: any) {
    this.tokenVerify(true);
    if (confirm("Are you sure ?")) {
      alert(id);
    }
  }










}
