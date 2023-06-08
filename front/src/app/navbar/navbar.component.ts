import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() idEvent = new EventEmitter<string>();

  nome = "Giovanni"

  constructor() {
  }

  ngOnInit(): void {
  }

  sendName(){
    this.idEvent.emit(this.nome)
  }
}
