import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  user : any;
  constructor(private router : Router) {
              this.user = this.getUser();
   }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  canActivate() : boolean
  {
    if(!this.user)
    {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('user');
  }
  
}
