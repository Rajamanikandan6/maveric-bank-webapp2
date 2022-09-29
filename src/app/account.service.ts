import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private _http:HttpClient) { }

  public accountDetailsFromClient():Observable<any>{

    var id = localStorage.getItem("userId");
    return this._http.get<any>("http://localhost:8000/api/v1/customers/"+id+"/customerAccounts");
  }

  public getAccountAndBalance(id:string):Observable<Account>{
    var idd = localStorage.getItem("userId");
    return this._http.get<any>("http://localhost:8000/api/v1/customers/"+idd+"/accounts/"+id); 

  }

  public getTransaction(id:string):Observable<any>{
    return this._http.get<any>("http://localhost:8000/api/v1/accounts/"+id+"/transaction"); 
  }
}
