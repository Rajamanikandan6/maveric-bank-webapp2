import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../transaction';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transaction = new Transaction;
  constructor(private service:TransactionService,private router:Router) { }

  ngOnInit(): void {
  }

  createTransaction(){
    
   
    var part = window.location.pathname.split("/")[2];
    this.transaction.accountId=part;
    this.service.addTransaction(this.transaction).subscribe(
      data => {
        Swal.fire(
          'Created',
          "Money " +this.transaction.type+"ed successfully",
          'success',
       ).then ( () => {
                 this.router.navigate(['/account']);
             });
      },
      error => {
        var div=<HTMLElement> document.querySelector(".transactionerror");
      div.innerHTML="ERROR: "+error.error.message;
      }
      
    )
  }

}
