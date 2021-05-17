import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DoggoAlbum } from 'src/app/Models/doggo-album';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DoggoAlbumService {

  rootUrl = environment.summerveldHoundResortApiUrl;
  paramDoggoAlbum = 'doggoalbum'
  paramDoggoAlbumById = '/getDoggoAlbumById'
  doggoAlbumId = '?doggoAlbumId='
  doggoAlbumUpdateDeleteId = '?id='

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addDoggoAlbum(doggo: DoggoAlbum){
    return this.http.post(`${this.rootUrl}${this.paramDoggoAlbum}`,doggo, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getDoggoAlbum(){
    return this.http.get(`${this.rootUrl}${this.paramDoggoAlbum}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getDoggoAlbumById(doggoAlbumId:number):Observable<DoggoAlbum>{
    return this.http.get<DoggoAlbum>(`${this.rootUrl}${this.paramDoggoAlbum}${doggoAlbumId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateDoggoAlbum(doggoAlbumId: number, doggoAlbum: DoggoAlbum): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramDoggoAlbum}${this.doggoAlbumUpdateDeleteId}${doggoAlbumId}`,doggoAlbum, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteDoggoAlbum(doggoAlbumId:number){
    return this.http.delete(`${this.rootUrl}${this.paramDoggoAlbum}${this.doggoAlbumUpdateDeleteId}${doggoAlbumId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
