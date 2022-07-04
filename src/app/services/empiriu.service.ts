import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

export interface Quote {
  philosopher: string;
  text: string;
  image: string;
  aboutPhilosopher: string;
  explanation: string;
  book: string;
}

export interface User{
  id: number;
  username: string;
  password: string;
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
  body;


  constructor(private http: HttpClient) {
  }


  getDailyQuote() : Observable<Quote> {
    return this.http.get<Quote>(`${this.url}/Quote/1`);
  }

  getJournal(date:string) : Observable<DailyJournal> {
    return this.http.get<DailyJournal>(`${this.url}/Journal/1/${date}`);
  }

  postJournal(data: DailyJournal){
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

  putJournal(data: DailyJournal){
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

  deleteJournal(id: number){
    this.http.delete(`${this.url}/Journal/${id}`).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
