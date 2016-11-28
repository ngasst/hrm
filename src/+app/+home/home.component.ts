import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { TableService } from '../shared/tables.service';
import { FormControl } from '@angular/forms';
import { ModelService } from '../shared/model/model.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'home',
  styleUrls: [ './home.component.scss' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  data: Observable<any>;
  tn = new FormControl();
  fn = new FormControl();
  constructor(public model: ModelService, private _ts: TableService) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
        
  }

  ngOnInit() {
    this.data = this.model.get('/data');
    this.data = this.tn.valueChanges
        .debounceTime(400)
        .distinctUntilChanged()
        .switchMap(term => this._ts.search(term));
  }

  
  sortAlphabetic(data: any[]) {

  }

  sortByCount(data: any[]) {

  }

  filterEmpty() {
      return this.data.filter(dp => !dp.isEmpty);
  }

}
