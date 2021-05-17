import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';
import { environment } from 'src/environments/environment';
import { Doggo } from 'src/app/Models/doggo';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoggoService {

  rootUrl = environment.summerveldHoundResortApiUrl;
  paramDoggo = 'Doggo/'
  paramDoggoById = '/getById'
  doggoId = '?id='
  doggoUpdateDeleteId = '?id='

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addDoggo(doggo: Doggo){
    return this.http.post(`${this.rootUrl}${this.paramDoggo}`,doggo, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getDoggo(){
    return this.http.get(`${this.rootUrl}${this.paramDoggo}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getDoggoById(doggoId:number):Observable<Doggo>{
    return this.http.get<Doggo>(`${this.rootUrl}${this.paramDoggo}${doggoId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateDoggo(doggoId:number, doggo:Doggo): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramDoggo}${this.doggoUpdateDeleteId}${doggoId}`,doggo, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteDoggo(doggoId:number){
    return this.http.delete(`${this.rootUrl}${this.paramDoggo}${this.doggoUpdateDeleteId}${doggoId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
