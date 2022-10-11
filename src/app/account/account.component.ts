import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { CustomerAccount } from '../customer-account';
import { AccountService } from '../services/account.service';
import { User } from '../user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account = new Account;
  user = new User;
  customerAccount=new CustomerAccount;
  typeArr : string[] = [];
  param1: string = "";
  count = 0;
  
  constructor(private service : AccountService,private router:Router,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.param1 = params['type'];
  });
  }

  page = 0;
  pageSize=2;

  ngOnInit(): void {
    this.getAccountDetails();
    const user_id=localStorage.getItem("userId") == null ? "" : localStorage.getItem("userId");
    this.getUserDetails(user_id!);
  }

  previousTransaction(): void {
    if(this.page > 0){
      this.page=this.page-1;
    this.service.getTransaction(this.account._id,this.page,this.pageSize).subscribe(
      data => { 
        this.account.transaction=data;
        var transHtml="";
        for(var i=0;i< this.account.transaction.length;i++){
        
        transHtml="<tr><td>"+this.account.transaction[i]._id+"</td><td>"+this.account.transaction[i].createdAt+"</td>";
        transHtml +=" <td>"+this.account.transaction[i].type== 'DEBIT' ? this.account.transaction[i].amount : "" +"</td>";
        transHtml += "<td>"+this.account.transaction[i].type== 'CREDIT' ? this.account.transaction[i].amount : "" +"</td></tr>";
        }

        const table = document.getElementById("transaction");
        if (table != null) {
          table.innerHTML="";
          table.innerHTML = transHtml;
        }
      }
  )
    }
  }

  nextTransaction(): void {
    this.page=this.page+1;
    this.service.getTransaction(this.account._id,this.page,this.pageSize).subscribe(
      data => { 
        this.account.transaction=data;
        var transHtml="";
        for(var i=0;i< this.account.transaction.length;i++){
        
        transHtml="<tr><td>"+this.account.transaction[i]._id+"</td><td>"+this.account.transaction[i].createdAt+"</td>";
        transHtml +=" <td>"+this.account.transaction[i].type== 'DEBIT' ? this.account.transaction[i].amount : "" +"</td>";
        transHtml += "<td>"+this.account.transaction[i].type== 'CREDIT' ? this.account.transaction[i].amount : "" +"</td></tr>";
        }

        const table = document.getElementById("transaction");
        if (table != null) {
          table.innerHTML="";
          table.innerHTML = transHtml;
        }
      }
  )
  }

  

  getAccountDetails(){
    this.service.accountDetailsFromClient().subscribe(
       
      data => { 
        let iddd = "";
        let encoded: string="";
        this.customerAccount.account=data;
        for(var i=0;i<this.customerAccount.account.length;i++){

          this.typeArr[i]= this.customerAccount.account[i].type;
          if(this.param1 == undefined){
            iddd=data[0]._id;
          }else{
            console.log("iiiii===",this.param1);
            encoded = atob(this.param1);
            if(encoded == this.customerAccount.account[i].type){
              iddd=this.customerAccount.account[i]._id;
              this.count=i;
            }
          }
        }

        console.log("ttttttt",this.typeArr);
        this.getAccBalance(iddd).then((data:any)=>{
         this.account.balance=data.balance;
         this.account._id=data._id;
         this.account.type=data.type;
         this.account.customerId=data.customerId;
         this.account.createdAt=data.createdAt;
         this.account.updatedAt=data.updatedAt;
        

       })
        this.getTransaction(iddd,0,2).then((data:any)=>{
          this.account.transaction=data;
      })
      
      },
      error => {
      }
    );
  }

  getAccountDetail(id:string){
    this.getAccBalance(id).then((data:any)=>{
      this.account.balance=data.balance;
      this.account._id=data._id;
      this.account.type=data.type;
      this.account.customerId=data.customerId;
      this.account.createdAt=data.createdAt;
      this.account.updatedAt=data.updatedAt;
     

    })
     this.getTransaction(id,0,2).then((data:any)=>{
       this.account.transaction=data;
   })
  }

  

  getUserDetails(user_id:string){
    this.service.getUser(user_id).subscribe(
      (data:User) => {
      this.user.firstName=data.firstName;
      this.user.lastName=data.lastName;
      this.user.middleName=data.middleName;
      }
    )
  }

    getAccBalance(id:string){
      return new Promise(resolve=>{
    this.service.getAccountAndBalance(id).subscribe(
     (data:Account) => {
      resolve(data);} 
     
    );
      })
  }

  getTransaction(id:string,page:number,pageSize:number){
    return new Promise(resolve=>{
    this.service.getTransaction(id,page,pageSize).subscribe(
      (data:Account) => {
        resolve(data);} ,
      error => {return error} 
      
     );
  })
}

createAccount(){
  const input = document.getElementById("inp_gender")as HTMLInputElement | null;
  const val = input?.value as string;
  var account = new Account;
  account.type = val;
  account.customerId = localStorage.getItem("userId") as string;
  this.service.createNewAccount(account).subscribe(
    data => {
      Swal.fire(
        'Created',
        'Account created successfully',
        'success',
     ).then ( () => {
      window.location.reload();
           });
      
    },
    error => {
      var div=<HTMLElement> document.querySelector(".accounterror");
      div.innerHTML="ERROR: "+error.error.message;
    }
    
  )

}

setradio(type:string){
  let encoded: string = btoa(type);

  var re = new RegExp("([?&])type=.*?(&|$)", "i");
  var uri =document.location.href
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    window.history.pushState("", "Page Title Here",uri.replace(re, '$1type=' + encoded + '$2'));
  }
  else {
    window.history.pushState("", "Page Title Here", uri + separator + "type=" + encoded);
  }

  window.location.reload();




}

redirectToTransaction(id:string){
  this.router.navigate(['/transaction/'+id]);

}

 openModal() {
  
  document.getElementById("backdrop")!.style.display = "block"
  document.getElementById("exampleModal")!.style.display = "block"
  document.getElementById("exampleModal")!.classList.add("show")
}
closeModal() {
  document.getElementById("backdrop")!.style.display = "none"
  document.getElementById("exampleModal")!.style.display = "none"
  document.getElementById("exampleModal")!.classList.remove("show")
}
// Get the modal
modal = document.getElementById('exampleModal');

// When the user clicks anywhere outside of the modal, close it


}
