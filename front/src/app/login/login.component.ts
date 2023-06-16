import {
  Component,
  OnInit
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {LOGIN} from '../graphql/graphql.mutations';
import {ActivatedRoute, Router} from "@angular/router";
import { NgForm } from '@angular/forms';
import {AuthService} from "../auth/auth/auth.service";
import {onError} from "@apollo/client/link/error";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loading = true;
  error : any;

  errorMessage: string | null = null;


  constructor(private apollo : Apollo, private route : ActivatedRoute, private _router : Router, private authService : AuthService, private router : Router) {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email
    const password = form.value.password
    this.apolloCheck(email, password)


  }

  apolloCheck(email : string, password : string){


    this.apollo
      .mutate({
        mutation : LOGIN,
        variables : {
          email :  email,
          password :  password,
        }
      }).subscribe((result : any) => {
        if (result?.data?.login){
          sessionStorage.setItem('token', result?.data?.login);
          console.log(result.data)
          this._router.navigateByUrl('/films');
          this.authService.isLoggedIn = true;
        }
    }
    , error => {
        this.error = true;
        this.errorMessage = "error in authentication, please retry inserting the credentials"
      });

  }



  ngOnInit(): void {

  }

  onClick(){
  }

}
