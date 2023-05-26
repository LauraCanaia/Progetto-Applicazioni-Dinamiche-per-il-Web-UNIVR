import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, OnDestroy,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-prova',
  templateUrl: './prova.component.html',
  styleUrls: ['./prova.component.css']
})

//parametri a destra dell'implements servo ad implementare il life cycle del component

export class ProvaComponent implements OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, AfterContentChecked,
DoCheck, OnDestroy{

  //model
  constructor(){
    console.log("costruttore")
  }
  ngOnInit(): void {
    console.log("on init")
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked")
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
  }

  ngDoCheck(): void {
    console.log("ngDoCheck")
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
  }

}
