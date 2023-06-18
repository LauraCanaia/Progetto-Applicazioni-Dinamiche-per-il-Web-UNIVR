import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = sessionStorage.getItem('token')!=null;

  constructor() { }

  isAuthenticated(){
    return this.isLoggedIn;
  }

}
