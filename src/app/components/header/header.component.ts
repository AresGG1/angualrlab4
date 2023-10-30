import { Component } from '@angular/core';
import {Route} from "../../interfaces/route";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  routes: Route[] = [
    {
      path: '/',
      label: 'Home'
    },
    {
      path: '/add',
      label: 'Add User'
    },
    {
      path: '/about',
      label: 'About'
    }
  ]
}
