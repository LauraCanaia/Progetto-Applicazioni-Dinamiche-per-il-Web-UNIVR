import { Component } from '@angular/core';
// @Component è un decoratore che serve a identificare un certo elemento
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
}
