import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

export interface Quote {
  philosopher: string;
  text: string;
  image: string;
  aboutPhilosopher: string;
  explanation: string;
  book: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string
}

export interface DailyJournal {
  id: number;
  user: User;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})

export class EmpiriuService {
  url = 'https://localhost:7185/api/Empiriu';
  urlUser = 'https://localhost:7185/api/Token/User';
  body;
  user: User;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }


  getDailyQuote(): Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/Quote/1`);
  }

  getJournal(date: string): Observable<DailyJournal> {
    return this.http.get<DailyJournal>(`${this.url}/Journal/1/${date}`);
  }

  postJournal(data: DailyJournal) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.body = JSON.stringify(data);
    console.log(this.body)
    this.http.post(`${this.url}/Journal`, this.body, httpOptions).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  putJournal(data: DailyJournal) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.body = JSON.stringify(data);
    console.log(this.body)
    this.http.put(`${this.url}/Journal/${data.id}`, this.body, httpOptions).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  deleteJournal(id: number) {
    this.http.delete(`${this.url}/Journal/${id}`).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  logIn(email: string, password: string): any {

    this.user = new class implements User {
      email: string;
      id: number;
      password: string;
      username: string;
    }
    this.user.id = 0;
    this.user.username = '';
    this.user.email = email;
    this.user.password = password;

    this.body = JSON.stringify(this.user);
    console.log(this.body)

    // @ts-ignore
    this.http.post(`${this.urlUser}`, this.body, {
        responseType: 'text',
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    ).subscribe((data: any) => {
      localStorage.setItem('access_token', data);
      this.getUser(email).subscribe(res => {
        this.user = res;
        this.router.navigate(['home'])
      });
    }, error => {
      console.log(error.error);
    });
  }

  getUser(email): Observable<User> {
    return this.http.get<User>(`${this.url}/User/${email}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }
}
