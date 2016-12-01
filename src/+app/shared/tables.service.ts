import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';



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

  search(term: SearchObject, options?: any) {
      let url: string = `/api/search`;
      return this._http.post(url, term)
        .map( res => res.json())
        .do(r => console.log(r))
        .toPromise()
        .catch(err => {
            console.log('Error ', err);
            return Observable.throw(err);
        });
  }

}

export interface SearchObject {
  tname: string;
  fname: string;
  sorta: boolean;
  showEmpty: boolean;
}