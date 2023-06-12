import {
  Component,
  OnInit
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {LOGIN} from '../graphql/graphql.mutations';
import {ActivatedRoute, Router} from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loading = true;
  error : any;

  constructor(private apollo : Apollo, private route : ActivatedRoute, private _router : Router) {
  }

  onSubmit(form: NgForm) {
    console.log(form)
    const email = form.value.username
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
        console.log(result)


        if (result?.data?.login){
          sessionStorage.setItem('token', result?.data?.login);
          this._router.navigateByUrl('/films');
        }
        // TODO else scrivi messaggio errore
    });

  }



  ngOnInit(): void {

  }

  onClick(){

  }
}
