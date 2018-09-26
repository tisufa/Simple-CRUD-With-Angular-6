import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) {

  }
  
  getEmployees(): Observable<any> {
    return this.http.get(endpoint + 'employees').pipe(
      map(this.extractData));
  }

  getEmployee(id): Observable<any> {
    return this.http.get(endpoint + 'employees/' + id).pipe(
      map(this.extractData));
  }

  addEmployee(employee): Observable<any> {
    return this.http.post<any>(endpoint + 'employees', JSON.stringify(employee), httpOptions).pipe(
      tap((employee) => console.log(`added employee w/ id=${employee.id}`)),
      catchError(this.handleError<any>('addEmployee'))
    );
  }

  updateEmployee(id, employee): Observable<any> {
    const newEmployee = {
      id: employee.id,
      name: employee.name,
      department: employee.department
    }
    return this.http.put(endpoint + 'employees/' + id, JSON.stringify(newEmployee), httpOptions).pipe(
      tap(_ => console.log('Employee has been updated!')),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  deleteEmployee(id): Observable<any> {
    return this.http.delete<any>(endpoint + 'employees/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<any>('deleteEmployee'))
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
