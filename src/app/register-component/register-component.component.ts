import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'; 
declare var $: any;  
@Component({
  selector: 'app-register-component', 
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService, private router: Router,private cookieService: CookieService) { 

  }
 
  ngOnInit(): void {
if (this.APIservice.checkuserIsloggedin()) {
      this.router.navigateByUrl('/user/home');
    }
$(document).ready(() => {  
  document.title = "MEAN Technology || User - Register";
  document.body.style.backgroundColor = "aliceblue";
});

  }


 registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]),
    photo: new FormControl('', [Validators.required])
  })
  get name() {
    return this.registerForm.get('name');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get photo() {
    return this.registerForm.get('photo');
  }
uploadFile(event: any): void {
    // this.filename = event.target.files[0].name;
    this.registerForm.patchValue({
      photo: <File>event.target.files[0]
    });
    console.clear();
  }
registerPoint: boolean = false;
apistatusCode: any;
register_message: any;
apibody: any;
progress: number = 0;
evenTotal: any;
  Register(){
     const form = new FormData();
    form.append('name', this.registerForm.get('name')?.value);
    form.append('phone', this.registerForm.get('phone')?.value);
    form.append('email', this.registerForm.get('email')?.value);
    form.append('password', this.registerForm.get('password')?.value);
    form.append('photo', this.registerForm.get('photo')?.value);
    this.APIservice.ForRegister(form).subscribe((response: HttpEvent<any>) => {
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
          this.registerPoint = true;
          if (this.apibody.status == 200) {
            this.register_message = this.apibody.message;
            this.registerForm.reset();
            setTimeout(() => { 
              this.registerPoint = false;
              this.router.navigateByUrl('/login');
            }, 3000);
          } else {
            this.register_message = this.apibody.message;
            setTimeout(() => {
              this.registerPoint = false;
            }, 5000);
          }
      }
    });
  }


}
