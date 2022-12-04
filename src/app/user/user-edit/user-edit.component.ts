import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService, private router: Router, private cookieService: CookieService, private Activeroute: ActivatedRoute) {

  }
  ngOnInit(): void {


    // this.Activeroute.queryParams.subscribe(params => {});
    // this.userid =this.Activeroute.snapshot.queryParamMap.get('id'); [queryParams]="{ id: item._id }"

    if(!this.Activeroute.snapshot.paramMap.get('id')){
      this.router.navigateByUrl('/user/home');
    }

    this.userid = this.Activeroute.snapshot.paramMap.get('id');

    this.tokenVerify(false);
    

    $(document).ready(() => {
      document.title = "MEAN Technology || User - Edit";
    });

    if (this.APIservice.checkuserIsloggedin()) {
      this.GetUserDetails(this.userid);
    }


  }



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

userid:any;
apibody: any;
useroldphoto:any="no-img.jpg";
GetUserDetails(id:any){
this.tokenVerify(true);
    this.APIservice.ForUserDetails(id).subscribe((response: HttpEvent<any>) => {
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
            // console.log(this.apibody);
             this.updateForm = new FormGroup({
                id: new FormControl(this.apibody.user._id),
                name: new FormControl(this.apibody.user.name),
                oldphoto: new FormControl(this.apibody.user.photo),
                phone: new FormControl(this.apibody.user.phone),
                email: new FormControl(this.apibody.user.email),
                password: new FormControl(''),
                photo: new FormControl('')
              });
              this.useroldphoto=this.apibody.user.photo;
          } else {
            alert(this.apibody.message);
            this.router.navigateByUrl('/user/home');
          }
      }
    });
}
 
 updateForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    oldphoto: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required,  Validators.minLength(10), Validators.maxLength(10),Validators.pattern('[0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    photo: new FormControl('')
  });
  get name() {
    return this.updateForm.get('name');
  }
  get phone() {
    return this.updateForm.get('phone');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get password() {
    return this.updateForm.get('password');
  }
  get photo() {
    return this.updateForm.get('photo');
  }

uploadFile(event: any): void {
    this.updateForm.patchValue({
      photo: <File>event.target.files[0]
    });
    console.clear();
  }


updatePoint: boolean = false;
apistatusCode: any;
update_message: any;

UpdateForm(){
this.tokenVerify(true);
    const form = new FormData();
    form.append('name', this.updateForm.get('name')?.value);
    form.append('phone', this.updateForm.get('phone')?.value);
    form.append('email', this.updateForm.get('email')?.value);
    form.append('password', this.updateForm.get('password')?.value);
    form.append('photo', this.updateForm.get('photo')?.value);
    form.append('oldphoto', this.updateForm.get('oldphoto')?.value);
    form.append('id', this.updateForm.get('id')?.value);
    this.APIservice.ForUpdateForm(form).subscribe((response: HttpEvent<any>) => {
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
          this.apistatusCode=this.apibody.status;
           this.updatePoint = true;
          if (this.apibody.status == 200) {
              this.update_message = this.apibody.message;
            setTimeout(() => { 
              this.updatePoint = false;
              this.router.navigateByUrl('/user/home');
            }, 3000);
          } else {
            this.update_message = this.apibody.message;
            setTimeout(() => { 
              this.updatePoint = false;
            }, 3000);
          }
      }
    });
}


}
