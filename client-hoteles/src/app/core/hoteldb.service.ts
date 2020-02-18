import { IHotel } from '../share/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HoteldbService {
  private hotelsUrl = 'api/hotels';

  constructor(private http: HttpClient) { }

  getHotels(): Observable<IHotel[]> {
    return this.http.get<IHotel[]>(this.hotelsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getMaxHotelId(): Observable<IHotel> {
    return this.http.get<IHotel[]>(this.hotelsUrl)
    .pipe(
      // Get max value from an array
      map(data => Math.max.apply(Math, data.map(function(o) { return o.id; }))   ),
      catchError(this.handleError)
    );
  }

  getHotelById(id: number): Observable<IHotel> {
    const url = `${this.hotelsUrl}/${id}`;
    return this.http.get<IHotel>(url)
      .pipe(
        tap(data => console.log('getHotel: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createHotel(hotel: IHotel): Observable<IHotel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    hotel.id = null;
    return this.http.post<IHotel>(this.hotelsUrl, hotel, { headers: headers })
      .pipe(
        tap(data => console.log('createHotel: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteHotel(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.hotelsUrl}/${id}`;
    return this.http.delete<IHotel>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteHotel: ' + id)),
        catchError(this.handleError)
      );
  }

  updateHotel(hotel: IHotel): Observable<IHotel> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.hotelsUrl}/${hotel.id}`;
    return this.http.put<IHotel>(url, hotel, { headers: headers })
      .pipe(
        tap(() => console.log('updateHotel: ' + hotel.id)),
        // Return the hotel on an update
        map(() => hotel),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
