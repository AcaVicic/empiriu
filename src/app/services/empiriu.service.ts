import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmpiriuService {
  url = 'https://localhost:7185/api/Empiriu';


  constructor(private http: HttpClient) { }


  searchData() {
    return this.http.get(`${this.url}/Quote/1`).subscribe(data => console.log(data));
  }


}
