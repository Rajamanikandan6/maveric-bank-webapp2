import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  constructor(private _service : LoginService,private router:Router) { }



  ngOnInit(): void {
  }

  userLogin(){
  this._service.loginUserFromClient(this.user).subscribe(
    data => {
      localStorage.setItem('token',data.token)
      localStorage.setItem('userId',data.user.id)
      localStorage.setItem('user',data.user.firstName)
      this.router.navigate(['/account']);
    },
    error => {
      var div=<HTMLElement> document.querySelector(".javaerror");
      div.innerHTML="ERROR: "+error.error.message;
    
    }


  );
  }

}
