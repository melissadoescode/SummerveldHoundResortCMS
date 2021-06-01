import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album } from 'src/app/Models/album';
import { AlbumViewModel } from 'src/app/Models/ViewModels/AlbumViewModel';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  rootUrl = environment.summerveldHoundResortApiUrl;
  paramAlbum = 'album';
  paramGetByDoggoId = 'getAlbumByDoggoId';
  paramDoggoId = 'doggoId';
  albumUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addAlbum(album: Album){
    return this.http.post(`${this.rootUrl}${this.paramAlbum}`,album, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getAlbum(){
    return this.http.get(`${this.rootUrl}${this.paramAlbum}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getAlbumById(albumId:number):Observable<Album>{
    return this.http.get<Album>(`${this.rootUrl}${this.paramAlbum}/${albumId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getAlbumByDoggoId(doggoId:number):Observable<AlbumViewModel>{
    return this.http.get<AlbumViewModel>(`${this.rootUrl}${this.paramAlbum}${this.paramGetByDoggoId}${this.paramDoggoId}${doggoId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  // updateAlbum(albumId: number, doggoAlbum: Album): Observable<any>{
  //   return this.http.put(`${this.rootUrl}${this.paramAlbum}${this.albumUpdateDeleteId}${albumId}`,doggoAlbum, this.httpOptions)
  //   .pipe(
  //     map((data:any)=>{
  //       return data;
  //     }),
  //     catchError(this.errorHandler.handleCrudError)
  //   );
  // }

  updateAlbum(albumId:number, album:Album): Observable<any>{
    console.log(this.http.put(`${this.rootUrl}${this.paramAlbum}${this.albumUpdateDeleteId}${albumId}`,album, this.httpOptions));
    return this.http.put(`${this.rootUrl}${this.paramAlbum}${this.albumUpdateDeleteId}${albumId}`,album, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteAlbum(albumId:number){
    return this.http.delete(`${this.rootUrl}${this.paramAlbum}${this.albumUpdateDeleteId}${albumId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
