import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'; 
 declare var $: any;  
@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit { 

  constructor(private APIservice: ApiConnectionService, private router: Router,private cookieService: CookieService) {

   }

ngOnInit(): void {
this.tokenVerify(false);

}

USER_DETAILS:any=this.APIservice.loginuserDetails();

tokenVerify(alertis:boolean){
 if (this.APIservice.checkuserIsloggedin()) {
      return true;
    } else {
      if(alertis){
        alert("Unauthorized. Please Login.");
      }
      window.localStorage.clear();
      this.router.navigateByUrl('/login');
      return false;
    }
}



apistatusCode: any;
logout_message: any;
apibody: any;
  Logout() {
    this.tokenVerify(true);
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
