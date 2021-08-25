import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  user : any;
  $user: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private router : Router) {
              this.$user.subscribe((val) => {
                this.user = val;
                console.log(val)
                console.log("entrou subscribe USER ")
              })
              this.getUser();
   }

  getUser() {
    this.$user.next(JSON.parse(localStorage.getItem('user')));
  }

  canActivate() : boolean
  {
    console.log("pega user")
    console.log(this.user)
    if(!this.user)
    {
      console.log("REDIRECIONOU LOGIN")
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('user');
  }
  
}
