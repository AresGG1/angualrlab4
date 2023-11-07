import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user-service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
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
  onDeleteUser(user: User): void {
    this.userService.deleteUser(user.id ?? '')
    this.userService.getUsers().subscribe((users) => this.users = users)
  }

  onEditUser(id: string) {
  }

  ngOnDestroy(): void {
  }

}
