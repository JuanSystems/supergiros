import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'supergiros';

  constructor(private router:Router){}
      Listar(){
        this.router.navigate(["listar"]);
      }
      Nuevo(){
        this.router.navigate(["add"])
      }
}
