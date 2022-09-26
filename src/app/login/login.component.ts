import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  constructor(private _service : LoginService) { }

  ngOnInit(): void {
  }

  userLogin(){
  this._service.loginUserFromClient(this.user).subscribe(
    data => console.log("response received"),
    error => console.log("error occurred")
  );
  }

}
