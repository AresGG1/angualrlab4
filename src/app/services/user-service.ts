import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [

  ]

  constructor() { }

  addUser(user: User){
    if (!user.id) {
      user.id = uuidv4()
      this.users.push(user)
      console.log(this.users)
      return
    }

    this.users.filter((u) => u.id == user.id)
    this.users.push(user)
  }
}
