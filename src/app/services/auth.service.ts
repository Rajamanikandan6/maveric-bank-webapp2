import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(){
    console.log("token=====>",localStorage.getItem('token'));
    return localStorage.getItem('token')!== null;
   // return true;
  }
}
