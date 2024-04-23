import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Houses } from '../interfaces/houses';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  url = "http://localhost:4200/api/houses";


  constructor(private http: HttpClient){}

  getHouses(): Observable<Houses[]>{
    return this.http.get<Houses[]>(this.url);
  }

  addHouse(body: any){
    return this.http.post(this.url, body, { 
      headers : {
        'Content-Type': 'application/json'
      },
      responseType : 'json',
    });
  }

  updateHouse(id: number, body:any): Observable<any>{
    console.log(id)
    console.log(body)
    return this.http.put(`${this.url}/${id}`, body, { 
      headers : {
        'Content-Type': 'application/json'
      }
    })
  }

  deleteHouse(id:number): Observable<any>{
    console.log(id)
    return this.http.delete(`${this.url}/${id}`);
  }







}
