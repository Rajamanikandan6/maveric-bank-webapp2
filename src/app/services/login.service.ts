import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private _http:HttpClient) { }

  public loginUserFromClient(user :User):Observable<any>{

    return this._http.post<any>("http://localhost:8000/api/v1/auth/login",user)
  }
}
