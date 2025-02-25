import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Places } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.unsplash.com/search/photos';
  private accessKey = '';

  constructor(
    private http: HttpClient,
  ) { }

  fetchPlaces(query: string | null): Observable<Places[]> {
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&limit=10&format=json`
    return this.http.get<Places[]>(url);
  }

  getPhotos(query: string, perPage: number = 10, page: number = 1): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    return this.http.get(this.baseUrl, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`
      },
      params
    });
  }

}
