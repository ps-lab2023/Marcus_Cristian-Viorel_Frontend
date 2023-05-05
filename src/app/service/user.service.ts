import {Injectable} from "@angular/core";
import {User} from "../model/User";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = "http://localhost:8082/user";

  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<User> {
    console.log("login() in UserService");
    return this.httpClient.post<User>(this.baseUrl + '/login', user);
  }

  getUsers(): Observable<User[]> {
    console.log("getUsers() in UserService");
    return this.httpClient.get<User[]>(this.baseUrl + '/findAll');
  }

  removeUser(id: number): Observable<any> {
    console.log("removeUser() in UserService");
    return this.httpClient.delete(this.baseUrl + '/delete/' + id);
  }

  updateUser(id: number | undefined, username: string, password: string, isAdmin: boolean): Observable<any>{
    console.log("updateUser() in UserService");
    return this.httpClient.put<User>(this.baseUrl + '/update/' + id + '/' + username + '/' + password + '/' + isAdmin, null);
  }

  addUser(newUser: User): Observable<any> {
    console.log("addUser() in UserService");
    return this.httpClient.put<User>(this.baseUrl + '/add', newUser);
  }

  sendMessage(message: string): Observable<any> {
    console.log("sendMessages() in UserService");
    return this.httpClient.put(this.baseUrl + '/sendMessage', message);
  }
}
