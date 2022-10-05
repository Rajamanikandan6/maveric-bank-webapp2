import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogout:boolean = false;
  constructor(private router: Router) {
    // on route change to '/login', set the variable showHead to false
    router.events.subscribe(event => {
        console.log("urlBefore====>",event);
        if (event instanceof NavigationEnd) {
          console.log("url====>",event['url']);
          if (event['url'] == '/' || event['url'] == '/signup' ) {
            this.showLogout = false;
          } else {
            this.showLogout = true;
          }
        }
      });
    }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
