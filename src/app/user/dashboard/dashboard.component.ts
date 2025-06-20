import { Component, OnInit,ViewChild  } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
import * as fileSaver from 'file-saver';
import { ChildFnConComponent } from './../child-fn-con/child-fn-con.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('childfncon') childComponent: ChildFnConComponent | undefined;
  constructor(
    private APIservice: ApiConnectionService,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    window.addEventListener("scroll", this.handelInfiniteScroll);
    this.tokenVerify(false);
    if (this.APIservice.checkuserIsloggedin()) {
      this.GetUserList(this.page, this.limit);
      this.newGetUserList(this.page1, this.limit1);
    }
    $(document).ready(() => {
      document.title = 'MEAN Technology || Users - List';
      // document.body.style.backgroundColor = "white";
    });
  }
  current_scroll_position:any=0;
  pre_scroll_position:any=0;
  public handelInfiniteScroll = async () => {
    this.current_scroll_position = document.documentElement.scrollTop;
    console.clear();
    try {
      // console.log("scrollHeight " + document.documentElement.scrollHeight);
      // console.log("innerHeight " + window.innerHeight);
      // console.log("scrollTop " + document.documentElement.scrollTop);
      
        if ((window.innerHeight + document.documentElement.scrollTop + 1) > document.documentElement.scrollHeight) {
          console.log("current_scroll_position " +this.current_scroll_position);
          console.log("pre_scroll_position " +this.pre_scroll_position);
            if(this.last_page >= this.page1){
              if(this.dataload1==false){
                if(this.current_scroll_position > this.pre_scroll_position){// going to bottom
                  this.page1=this.page1+1;
                  this.pre_scroll_position=document.documentElement.scrollTop;
                  console.log(`window scroll down..`);
                  this.dataload1=true;
                 setTimeout(()=>{
                  this.newGetUserList(this.page1, this.limit1);
                 },1000)
                } else {
                  console.log(`window scroll top..`);
                }
              } else {
                console.log('data loading..');
              }
            } else {
              console.log(`data end`);
            }
          
        }
    } catch (error:any) {
        console.log(error.message);
    }
};

  USER_DETAILS: any = this.APIservice.loginuserDetails();


   callChildFunction() {
    this.childComponent?.childFn();
  }

  tokenVerify(alertis: boolean) {
    if (this.APIservice.checkuserIsloggedin()) {
      return true;
    } else {
      if (alertis) {
        alert('Unauthorized. Please Login.');
      }
      window.localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  pageChangeEvent(event: number) {
    this.page = event;
    this.GetUserList(this.page, this.limit);
  }
  setLimit(l: any) {
    this.limit = l;
    this.GetUserList(1, l);
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
  dataload:boolean=false;
  GetUserList(p: number, l: number) {
    this.tokenVerify(true);
    this.dataload=true;
    this.APIservice.ForGetUserList(p, l).subscribe(
      (response: HttpEvent<any>) => {
        this.dataload=false;
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
              this.checkNo =
                this.pagingCounter + this.apibody.list.docs.length - 1;
              const data = this.apibody.list.docs;
              data.forEach((item: any, key: any) => {
                this.records.push({
                  _id: item._id,
                  name: item.name,
                  phone: item.phone,
                  email: item.email,
                  photo: item.photo,
                  slno: this.pagingCounter++,
                  tokens: item.tokens,
                  updated_at: item.updated_at,
                  created_at: item.created_at,
                  __v: item.__v,
                });
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
      }
    );
  }

  page1:any=1;
  limit1=5;
  dataload1:boolean=false;
  records_new:any[]=[];
  last_page=0;
  newGetUserList(p: number, l: number) {
    this.tokenVerify(true);
    this.dataload1=true;
    this.APIservice.ForGetUserList(p, l).subscribe(
      (response: HttpEvent<any>) => {
        this.dataload1=false;
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
              const data = this.apibody.list.docs;
              this.last_page = this.apibody.list.totalPages;
              console.log(this.last_page);
              data.forEach((item: any, key: any) => {
                this.records_new.push({
                  _id: item._id,
                  name: item.name,
                  phone: item.phone,
                  email: item.email,
                  photo: item.photo,
                  slno: this.pagingCounter++,
                  tokens: item.tokens,
                  updated_at: item.updated_at,
                  created_at: item.created_at,
                  __v: item.__v,
                });
              });
           
            } else {
              alert(this.apibody.message);
            }
        }
      }
    );
  }

  DeleteUser(id: any) {
    this.tokenVerify(true);
    if (confirm('Are you sure ?')) {
      this.APIservice.ForDeleteUser(id).subscribe(
        (response: HttpEvent<any>) => {
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
                if (id == this.USER_DETAILS._id) {
                  alert('Your profile has been deleted.');
                  window.localStorage.clear();
                  this.router.navigateByUrl('/login');
                } else {
                  this.GetUserList(this.page, this.limit);
                  alert(this.apibody.message);
                }
              } else {
                alert(this.apibody.message);
              }
          }
        }
      );
    }
  }

  xlbtn:boolean=false;
  pdfbtn:boolean=false;
  DownloadPDF(): any {
    this.xlbtn = true;
    this.pdfbtn = true;
    const databoj = new Date();
    let month: any =
      databoj.getMonth() + 1 <= 9
        ? `0${databoj.getMonth() + 1}`
        : databoj.getMonth() + 1;
    let date: any =
      databoj.getDate() <= 9 ? `0${databoj.getDate()}` : databoj.getDate();
    let today: any = `${databoj.getFullYear()}-${month}-${date}`;
    //npm install @types/file-saver --save-dev
    //npm install file-saver --save
  
    this.APIservice.ExportExcelFile('/export-xl').subscribe(
      (response: any) => {
        // console.log("ExportPDF ",response);
        let blob: any = new Blob([response], {
          type: 'application/excel; charset=utf-8',
        });
        const url = window.URL.createObjectURL(blob);
        // console.log(url,blob);
        fileSaver.saveAs(blob, `excel-file-${today}.xlsx`);
        this.xlbtn = false;
        this.pdfbtn = false;
      },
      (error: any) => {
        this.xlbtn = false;
        this.pdfbtn = false;
        console.error('Error downloading the pdf file.. ', error);
      }
    );
  }


CallChild(e:any):any{
  console.log(e)
}



}
