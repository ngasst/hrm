import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class TableService {
  constructor(public _http: Http) {

  }

 /**
  * whatever domain/feature method name
  */
  get(url: string, options?: any) {
    return this._http.get(url, options)
      .map(res => res.json())
      .catch(err => {
        console.log('Error: ', err);
        return Observable.throw(err);
      });
  }

  search(term: string, options?: any) {
      let url: string = `/api/search/${term}`;
      return this._http.get(url)
        .map( res => res.json())
        .toPromise()
        .catch(err => {
            console.log('Error ', err);
            return Observable.throw(err);
        });
  }

}