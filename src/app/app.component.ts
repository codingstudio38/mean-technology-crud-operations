import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiConnectionService } from './services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-crud-operations';

constructor(private APIservice: ApiConnectionService, private router: Router,private cookieService: CookieService) {

}
ngOnInit()  
{  

} 

  


}
