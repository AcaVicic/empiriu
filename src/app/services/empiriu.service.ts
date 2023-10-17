import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from "rxjs";
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

export interface MementoMori {
  id: number;
  user: User;
  filledNumber: number;
  lastDate: Date;
}

@Injectable({
  providedIn: 'root'
})

export class EmpiriuService {

  quote: Quote = {
    text: "Continue to act thus, my dear Lucilius – set yourself free for your own sake; gather and save your time, which till lately has been forced from you, or filched away, or has merely slipped from your hands. Make yourself believe the truth of my words, – that certain moments are torn from us, that some are gently removed, and that others glide beyond our reach. The most disgraceful kind of loss, however, is that due to carelessness. Furthermore, if you will pay close heed to the problem, you will find that the largest portion of our life passes while we are doing ill, a goodly share while we are doing nothing, and the whole while we are doing that which is not to the purpose. What man can you show me who places any value on his time, who reckons the worth of each day, who understands that he is dying daily? For we are mistaken when we look forward to death; the major portion of death has already passed. Whatever years be behind us are in death's hands.",
    philosopher: "Seneca",
    book: "Letters From A Stoic",
    aboutPhilosopher: "Lucius Annaeus Seneca's (4 BC - AD 65) life can be neatly mapped to the rise and fall of the Julio-Claudian Dynasty of Rome. He was dealt the hand of death by the final emperor of the dynsaty Nero. Seneca was an active philosopher during the age of Roman revolution.",
    explanation: "\"Letters from a Stoic\" is read like a diary, or a handbook of philosophical meditations. These are counceling letters written to emperor Nero. The letters focus on many traditional themes of  the stoic philosophy, such as the concept of death, the value of friendship and virtue as the supreme good.",
    image: "https://imageupload.io/ib/DSwNfoRdaYbCHyN_1697500523.png"
  } as Quote;


  
  url = 'https://localhost:7185/api/Empiriu';
  urlUser = 'https://localhost:7185/api/Token/User';
  body;
  user: User;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }


  getDailyQuote(): Observable<Quote> {
    return of(this.quote);
    //return this.http.get<Quote>(`${this.url}/Quote/1`);
  }

  getJournal(date: string): Observable<DailyJournal> {
    return this.http.get<DailyJournal>(`${this.url}/Journal/1/${date}`);
  }

  getAllJournals(): Observable<DailyJournal[]> {
    return this.http.get<DailyJournal[]>(`${this.url}/Journal/1`);
  }

  getMementoMori(): Observable<MementoMori> {
    return this.http.get<MementoMori>(`${this.url}/MementoMori/1`);
  }

  saveMementoMori(): Observable<void> {
    return this.http.get<void>(`${this.url}/SaveMementoMori/1`);
  }

  postJournal(data: DailyJournal) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.body = JSON.stringify(data);
    console.log(this.body)
    return this.http.post(`${this.url}/Journal`, this.body, httpOptions);
  }

  putJournal(data: DailyJournal) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    this.body = JSON.stringify(data);
    console.log(this.body)
    return this.http.put(`${this.url}/Journal/${data.id}`, this.body, httpOptions);
  }

  deleteJournal(id: number) {
    return this.http.delete(`${this.url}/Journal/${id}`);
  }

  logIn(email: string, password: string): any {

    this.user = {
      email: email,
      password: password
    } as User;

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
        localStorage.setItem('user', JSON.stringify(res));
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

  getUserValue(){
    return JSON.parse(localStorage.getItem('user')) as User;
  }

  journals: DailyJournal[] = [
    {
      
    } as DailyJournal,
  ]
}
