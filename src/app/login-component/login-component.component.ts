import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'; 
 declare var $: any;  
@Component({ 
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService, private router: Router,private cookieService: CookieService) {

   }

ngOnInit(): void {

 if (this.APIservice.checkuserIsloggedin()) {
      this.router.navigateByUrl('/user/home');
    } 

$(document).ready(() => {  
  document.title = "MEAN Technology || User - Login";
  document.body.style.backgroundColor = "aliceblue";
});

}

 loginForm = new FormGroup({
    email_id: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  get email_id() {
    return this.loginForm.get('email_id');
  }
  get password() {
    return this.loginForm.get('password');
  }
   
loginPoint: boolean = false;
apistatusCode: any;
login_message: any;
apibody: any;
progress: number = 0;
evenTotal: any;
  Login(){
     const loginform = new FormData();
    loginform.append('email_id', this.loginForm.get('email_id')?.value);
    loginform.append('password', this.loginForm.get('password')?.value);
    this.APIservice.ForLogin(loginform).subscribe((response: HttpEvent<any>) => {
      switch (response.type) {
        case HttpEventType.Sent:
          //console.log('Sent' + HttpEventType.Sent);
          break;
        case HttpEventType.ResponseHeader:
          //console.log('ResponseHeader' + HttpEventType.ResponseHeader);
          break;
        case HttpEventType.UploadProgress:
          this.evenTotal = response.total;
          this.progress = Math.round(response.loaded / this.evenTotal * 100);
          break;
        case HttpEventType.Response:
          this.apibody = response.body;
          this.apistatusCode = this.apibody.status;
          this.loginPoint = true;
          if (this.apibody.status == 200) {
            this.login_message = this.apibody.message;
            window.localStorage.clear(); 
            window.localStorage.setItem("userdetails", JSON.stringify(this.apibody.user));
            setTimeout(() => {
              this.loginPoint = false;
              this.router.navigateByUrl('/user/home');
              this.loginForm.reset();
            }, 2000);
          } else {
            this.login_message = this.apibody.message;
            setTimeout(() => {
              this.loginPoint = false;
            }, 4000);
          }
      }
    });
  }





}
