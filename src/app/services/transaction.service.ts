import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _http:HttpClient) { }

  public addTransaction(transaction :Transaction):Observable<Transaction>{

    return this._http.post<any>("http://localhost:8000/api/v1/accounts/"+transaction.accountId+"/transactions",transaction)
  }


}
