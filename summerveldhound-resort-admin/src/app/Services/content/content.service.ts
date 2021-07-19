import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { Content } from 'src/app/Models/content';
import { ContentViewModel } from 'src/app/Models/ViewModels/ContentViewModel';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../ErrorHandler/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  rootUrl = environment.summerveldHoundResortApiUrl;
  paramContent = 'content';
  paramGetByAlbumId = 'getContentByAlbumId';
  paramAlbumId = 'albumId';
  contentUpdateDeleteId = '?id=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  addContent(content:Content){
    return this.http.post(`${this.rootUrl}${this.paramContent}`,content, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getContent(){
    return this.http.get(`${this.rootUrl}${this.paramContent}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getContentById(contentId:number):Observable<Content>{
    return this.http.get<Content>(`${this.rootUrl}${this.paramContent}/${contentId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  getContentByAlbumId(albumId:number):Observable<ContentViewModel>{
    return this.http.get<ContentViewModel>(`${this.rootUrl}${this.paramContent}${this.paramGetByAlbumId}${this.paramAlbumId}${albumId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  updateContent(contentId:number, content:Content): Observable<any>{
    return this.http.put(`${this.rootUrl}${this.paramContent}${this.contentUpdateDeleteId}${contentId}`,content, this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }

  deleteContent(contentId:number){
    return this.http.delete(`${this.rootUrl}${this.paramContent}${this.contentUpdateDeleteId}${contentId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandler.handleCrudError)
    );
  }
}
