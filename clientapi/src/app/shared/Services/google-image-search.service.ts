import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleImageSearchService {

  constructor(private http : HttpClient) { }
  getImages(name){
    return this.http.get("https://www.googleapis.com/customsearch/v1?key= "+ environment.googleapi + "&cx=002908579731254509235:aieioiemxos&searchtype=image&q=" + name + " 'case'")
  }
}
