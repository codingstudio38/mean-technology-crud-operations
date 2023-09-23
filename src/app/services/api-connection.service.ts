import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  // API_URL:string = environment.API_URL;
  LOGIN_USER:any = this.loginuserDetails();
  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Get client-side error\n${error.error.message}`;
    } else {
      errorMessage = `Get server-side error\nError Code: ${error.status}\nMessage: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(errorMessage);
  }

checkuserIsloggedin():boolean {
    if (!window.localStorage.getItem("userdetails")) {
      return false;
    } else {
      return true;
    }
}

loginuserDetails(){
  var data:any = window.localStorage.getItem("userdetails");
  return JSON.parse(data);
}


  ForLogin(data:any) {
    return this.http.post(`${environment.API_URL}/login`,data, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ForRegister(data:any) {
    return this.http.post(`${environment.API_URL}/create`,data, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ForLogout() {
    return this.http.get(`${environment.API_URL}/logout`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

    ForGetUserList(p:number,l:number) {

    return this.http.get(`${environment.API_URL}/users-list?page=${p}&size=${l}`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ForDeleteUser(id:any){
    return this.http.delete(`${environment.API_URL}/user?id=${id}`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ForUserDetails(id:any){
    return this.http.get(`${environment.API_URL}/user?id=${id}`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }
  ForUpdateForm(data:any) {
    return this.http.put(`${environment.API_URL}/update`,data, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }

  ForUsersPost(p:number, l:number){
    return this.http.get(`${environment.API_URL}/users/post-list?page=${p}&size=${l}`, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders().set('authorization', this.loginuserDetails().token)
    }).pipe(
      catchError(this.errorMgmt)
    );
  }



  
  getGoogleResponse(data:any){
    return this.http.post(`${environment.googleTr_url}?key=${environment.googleApi_key}`,data).pipe(
      catchError(this.errorMgmt)
    );
  }


 














}
