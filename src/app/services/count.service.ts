import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  count: any;

  constructor(private http: HttpClient) {}

  getParametros() {
    return this.http.get<any>('assets/json/counters.json').pipe(
      tap((resp) => {
        this.count = resp;
      })
    );
  }
}
