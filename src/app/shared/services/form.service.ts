import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) {}

  fetch(page?: number): Observable<any> {
    return this.http.get<any>(`https://test.s-group.vn.ua/api/v1/forms?page=${page ? page : 1}`)
  } 

  fetchByDate(date): Observable<any> {
    return this.http.get<any>(`https://test.s-group.vn.ua/api/v1/forms?filters=created_at,>=,${date}`)
  }

  getBySearch(search: string): Observable<any> {
    return this.http.get<any>(`https://test.s-group.vn.ua/api/v1/forms?search=${search}`)
  }

  update(formId: number, formData): Observable<any> {
    return this.http.post<any>(`https://test.s-group.vn.ua/api/v1/forms/${formId}`, formData)
  }

  delete(formId: number): Observable<any> {
    return this.http.delete<any>(`https://test.s-group.vn.ua/api/v1/forms/${formId}`)
  }

  create(formData): Observable<any> {
    return this.http.post<any>(`https://test.s-group.vn.ua/api/v1/forms`, formData)
  }
}
