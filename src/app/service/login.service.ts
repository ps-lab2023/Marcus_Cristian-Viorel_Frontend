import {Injectable} from "@angular/core";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private username: string = "";
  private password: string = "";
  private isAdmin: boolean = false;
  private user: User = new User()

  constructor() {
  }

  getUsername(): string {
    return this.username;
  }

  setUsername(username: string): void {
    this.username = username;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdmin = isAdmin;
  }

  getIsAdmin() {
    return this.isAdmin ? "Admin" : "Regular user";
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
