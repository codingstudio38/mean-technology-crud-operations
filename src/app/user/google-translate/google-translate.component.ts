import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-google-translate',
  templateUrl: './google-translate.component.html',
  styleUrls: ['./google-translate.component.css']
})
export class GoogleTranslateComponent implements OnInit {
constructor(private APIservice: ApiConnectionService, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.tokenVerify(false);
    $(document).ready(() => {
      document.title = "MEAN Technology || Users - Google Translate";
      // document.body.style.backgroundColor = "white";
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
  
 googleForm = new FormGroup({
    googletext: new FormControl('', [Validators.required]),
    googlelanguage: new FormControl('', [Validators.required]),
    google_resulte: new FormControl('')
  })

  get googletext() {
    return this.googleForm.get('googletext');
  }

  get googlelanguage() {
    return this.googleForm.get('googlelanguage');
  }
  get google_resulte() {
    return this.googleForm.get('google_resulte');
  }

Test(){

}

apistatusCode: any;
apibody: any;
progress: number = 0;
evenTotal: any;
GetResulte(language:any,text:any):any{
  if(language==""){
    alert('Please select language'); 
    return false;
  }
  let data:any = {
    'target':language,
    'q':[text]
  }
  console.log(data);
    this.APIservice.getGoogleResponse(data).subscribe((response:any) => {
          this.apibody = response.body;
          this.apistatusCode = this.apibody.status;
          console.clear();
          console.log(this.apibody);
    });
}

}
