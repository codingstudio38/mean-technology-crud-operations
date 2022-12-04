import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from './../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService,private router: Router) { 

  }
 
  ngOnInit(): void {
  }
  
showUser:boolean = this.APIservice.checkuserIsloggedin();

USER_DETAILS:any=this.APIservice.loginuserDetails();



apistatusCode: any;
logout_message: any;
apibody: any;
  Logout() {
    if (this.showUser === false) {
      alert("Unauthorized. Please Login.");
      window.localStorage.clear();
      this.router.navigateByUrl('/login');
      return;
    } 
    if (confirm("Are You Sure..") == true) {
      this.APIservice.ForLogout().subscribe((response: HttpEvent<any>) => {
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
            this.apistatusCode = this.apibody.status;
            if (this.apibody.status == 200) {
              this.logout_message = this.apibody.message;
              window.localStorage.clear();
              this.router.navigateByUrl('/login');
            } else {
              alert(this.apibody.message);
            }
        }
      });
    }
  } 






}
