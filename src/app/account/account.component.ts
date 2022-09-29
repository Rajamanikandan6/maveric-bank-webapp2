import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = new Account;
  constructor(private service : AccountService,private router:Router) { }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  

  getAccountDetails(){
    this.service.accountDetailsFromClient().subscribe(
      data => { 
        console.log("account======>"+data[0].type);
        var accountBalance = this.getAccBalance(data[0]._id);
        console.log("accountBal====>"+accountBalance);
        var transaction = this.getTransaction(data[0]._id);
        console.log("Transactions====>"+transaction);
      },
      error => {
      }
    );
  }

    getAccBalance(id:string){
    this.service.getAccountAndBalance(id).subscribe(
     data => { return data},
     error => {return error} 
     
    );
  }

  getTransaction(id:string){
    this.service.getTransaction(id).subscribe(
      data => { return data},
      error => {return error} 
      
     );
  }

}
