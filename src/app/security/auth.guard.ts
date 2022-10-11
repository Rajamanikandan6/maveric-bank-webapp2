import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{

constructor(private authService:AuthService,private router:Router){

}

    canActivate() {
       // localStorage.clear();
        if(this.authService.isLoggedIn()){
            return true;
        }
            this.router.navigate(['/']);
            return false;

    }

}