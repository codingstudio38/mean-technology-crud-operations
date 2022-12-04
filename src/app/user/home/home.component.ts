import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router'; 
 declare var $: any;   
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private APIservice: ApiConnectionService, private router: Router,private cookieService: CookieService) {

   }

ngOnInit(): void {
this.tokenVerify(false); 
 
$(document).ready(() => {  
  document.body.style.backgroundColor = "white";
});


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
 
}
