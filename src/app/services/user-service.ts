import {Injectable} from '@angular/core';
import {User} from "../interfaces/user";
import {v4 as uuidv4} from 'uuid';
import {BehaviorSubject, Observable} from "rxjs";
import {Type} from "../enums/type";
import {Sex} from "../enums/sex";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users =
    new BehaviorSubject<User[]>([
      {
        name: "askdsak",
        lastname: "kdask",
        email: "asdma@gmail.com",
        password: "Test2020_",
        phone: "+380988484848",
        sex: Sex.Female,
        id: "82065646-a7d7-4a6f-a8d8-c6386ad0da2d",
        subjects: ["Math", "English", "Physics"],
        description: "sdas",
        type: Type.A
      }
    ]);

  constructor() { }

  addUser(user: User): void {

    console.log(user);
    if (!user.id) {
      user.id = uuidv4()
      this.users.next([...this.users.getValue(), user])
      console.log(this.users.getValue())
      return
    }

    const users= this.users.getValue().filter((u) => u.id != user.id)
    this.users.next([...users, user])
  }
  getUsers(): Observable<User[]> {
    return this.users.asObservable()
  }

  getUserById(id: string): User | undefined {
    return this.users.getValue().find((u) => u.id == id)
  }
}
