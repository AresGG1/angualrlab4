import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  showFirst: boolean = false
  showSecond: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.showFirst = true
    }, 1000)

    setTimeout(() => {
      this.showSecond = true
    }, 4000)
  }

}
