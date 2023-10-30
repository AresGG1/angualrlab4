import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[]


  displayedColumns: string[] = [
    'name',
    'lastname',
    'email',
    'phone',
    'sex',
    'subjects',
    'description',
    'type',
  ];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe(value => this.users = value)
  }
  onDeleteUser(id: string): void {
    this.users = this.users.filter((u) => u.id != id)
  }

}
