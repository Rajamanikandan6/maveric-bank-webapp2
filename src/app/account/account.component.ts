import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = new Account;
  user = new User;
  constructor(private service : AccountService,private router:Router) { }

  ngOnInit(): void {
    this.getAccountDetails();
    const user_id=localStorage.getItem("userId") == null ? "" : localStorage.getItem("userId");
    this.getUserDetails(user_id!);
  }

  

  getAccountDetails(){
    this.service.accountDetailsFromClient().subscribe(
      data => { 
        console.log("account======>"+data[0].type);
        this.getAccBalance(data[0]._id).then((data:any)=>{
         console.log("test===>"+data._id);
         this.account.balance=data.balance;
         this.account._id=data._id;
         this.account.type=data.type;
         this.account.customerId=data.customerId;
         this.account.createdAt=data.createdAt;
         this.account.updatedAt=data.updatedAt;
        

       })
        this.getTransaction(data[0]._id).then((data:any)=>{
          console.log("test===>"+data[0]._id);
          this.account.transaction=data;
      })
      
      },
      error => {
      }
    );
  }

  

  getUserDetails(user_id:string){
    this.service.getUser(user_id).subscribe(
      (data:User) => {console.log(data);
      this.user.firstName=data.firstName;
      this.user.lastName=data.lastName;
      this.user.middleName=data.middleName;
      }
    )
  }

    getAccBalance(id:string){
      return new Promise(resolve=>{
    this.service.getAccountAndBalance(id).subscribe(
     (data:Account) => { console.log(data);
      resolve(data);} 
     
    );
      })
  }

  getTransaction(id:string){
    return new Promise(resolve=>{
    this.service.getTransaction(id).subscribe(
      (data:Account) => { console.log(data);
        resolve(data);} ,
      error => {return error} 
      
     );
  })
}

}
