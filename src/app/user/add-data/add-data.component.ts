import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators,FormArray,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn } from '@angular/forms';
import { ApiConnectionService } from './../../services/api-connection.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
declare var $: any;
import { environment } from '../../../environments/environment';

import { CustomValidators } from './../../custom_form_validation/custom_validation';
import { MyValidatorService } from './../../services/my-validator.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

constructor(private APIservice: ApiConnectionService, private router: Router, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    $(document).ready(() => {
      document.title = "MEAN Technology || Add Data";
      // document.body.style.backgroundColor = "white";
    });
  }
 

  myForm = new FormGroup({
    'name': new FormControl('',[MyValidatorService.Checkname()]),
    'email': new FormControl('',[MyValidatorService.Checkemail()]),
    'phone': new FormControl('',[MyValidatorService.Checkphone()]),
    'password': new FormControl('',[MyValidatorService.Checkpassword()]),
  });


  get name(){
    return this.myForm.get('name');
  }
   get email(){
    return this.myForm.get('email');
  }
   get phone(){
    return this.myForm.get('phone');
  }
   get password(){
    return this.myForm.get('password');
  }



  AddNew(){
    console.log(this.myForm.value);
  }



}

