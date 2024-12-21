import { Injectable } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';


interface LoginData {
  email: string;
  password: string;
}



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router) {}

  isLoggedIn(role: any): void{
      if(!role){
        console.log("You must log in!")
        this.router.navigate(['/login']);
      }
      else{

        console.log("User logged in as " + role)
      }
  }



}
