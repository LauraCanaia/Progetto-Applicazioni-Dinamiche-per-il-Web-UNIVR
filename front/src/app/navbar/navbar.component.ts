import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{



  @Output() idEvent = new EventEmitter<string>();

  constructor(private _router : Router) {
  }

  ngOnInit(): void {
  }


  onClickLogout() {
    sessionStorage.clear();
    this._router.navigateByUrl('/');
  }


}
