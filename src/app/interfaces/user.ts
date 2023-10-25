import {Type} from "../enums/type";
import {Sex} from "../enums/sex";

export interface User {
  id?: string,
  name: string,
  lastname: string,
  type: Type,
  email: string,
  password: string,
  subjects?: string[],
  description?: string,
  sex?: Sex,
  phone?: string
}
