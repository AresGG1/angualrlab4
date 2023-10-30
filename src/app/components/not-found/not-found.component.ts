import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  //I need to create a 5 seconds timer than redirect to home page using router
  //don't use window.location.href = '/home'
  timer = 5
  constructor(private router: Router) {
  }
  ngOnInit() {
    // I need to show this timer on frontend (each second)
    setInterval(() => {
      this.timer--
    }, 1000)


    setTimeout(() => {
      this.router.navigate([''])
    }, 5000)
  }
}
