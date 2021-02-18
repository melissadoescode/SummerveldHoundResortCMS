import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Icons } from 'src/app/Models/icon';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  rootUrl = environment.summerveldHoundResortApiUrl;
  paramIcon = 'icon/'
  paramIconById = '/getIconById'
  iconId = '?iconId='
  iconUpdateDeleteId = '?id='

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addIcon(icon: Icons){
    return this.http.post(`${this.rootUrl}${this.paramIcon}`,icon, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getIcon(){
    return this.http.get(`${this.rootUrl}${this.paramIcon}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getIconById(iconId:number):Observable<Icons>{
    return this.http.get<Icons>(`${this.rootUrl}${this.paramIcon}${iconId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateIcon(iconId:number, icon:Icons): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramIcon}${this.iconUpdateDeleteId}${iconId}`,icon, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteIcon(iconId:number){
    return this.http.delete(`${this.rootUrl}${this.paramIcon}${this.iconUpdateDeleteId}${iconId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
