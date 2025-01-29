import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http:HttpClient) { }

  getWords(){
    return this.http.get('assets/sgb-words.txt', { responseType: 'text' })
  }
}
