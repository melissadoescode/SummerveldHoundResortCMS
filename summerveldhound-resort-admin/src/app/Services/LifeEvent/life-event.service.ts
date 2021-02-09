import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LifeEvent } from 'src/app/Models/life-event';
import { LifeEventViewModel } from 'src/app/Models/ViewModels/LifeEventViewModel';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LifeEventService {

  rootUrl = environment.summerveldHoundResortApiUrl;
  paramLifeEvent = 'lifeevent/'
  paramLifeEventById = '/getLifeEventById'
  paramGetAll = '/getAllLifeEvents'
  lifeEventId = '?lifeEventId='
  lifeEventUpdateDeleteId = '?id='
  
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addLifeEvent(lifeevent: LifeEvent){
    return this.http.post(`${this.rootUrl}${this.paramLifeEvent}`,lifeevent, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getLifeEvent():Observable<LifeEventViewModel[]>{
    return this.http.get<LifeEventViewModel[]>(`${this.rootUrl}${this.paramLifeEvent}`)
    .pipe(catchError(this.errorHandler.handleError));
  }
  //TODO: Remove
  getLifeEventById(lifeEventId:number):Observable<LifeEventViewModel[]>{
    return this.http.get<LifeEventViewModel[]>(`${this.rootUrl}${this.paramLifeEvent}${lifeEventId}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  // updateLifeEvent(lifeEventId:number, lifeEvent:LifeEvent){
  //   return this.http.put(`${this.rootUrl}${this.paramLifeEvent}${this.lifeEventUpdateDeleteId}${lifeEventId}`,lifeEventId)
  //   .pipe(
  //     map((data:any)=>{
  //       return data;
  //     }),
  //     catchError(this.errorHandler.handleCrudError)
  //   );
  // }

  updateLifeEvent(lifeEventId:number, lifeEvent:LifeEvent): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramLifeEvent}${this.lifeEventUpdateDeleteId}${lifeEventId}`,lifeEvent, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteLifeEvent(lifeEventId:number){
    return this.http.delete(`${this.rootUrl}${this.paramLifeEvent}${this.lifeEventUpdateDeleteId}${lifeEventId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
