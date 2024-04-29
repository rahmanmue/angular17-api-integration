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

  postHouse(body: Houses):Observable<Houses>{
    return this.http.post<Houses>(this.url, body, { 
      headers : {
        'Content-Type': 'application/json'
      },
      responseType : 'json',
    });
  }

  putHouse(id: number, body: Houses): Observable<Houses>{
    return this.http.put<Houses>(`${this.url}/${id}`, body, { 
      headers : {
        'Content-Type': 'application/json'
      }
    })
  }

  deleteHouse(id:number): Observable<Houses>{
    return this.http.delete<Houses>(`${this.url}/${id}`);
  }

}
