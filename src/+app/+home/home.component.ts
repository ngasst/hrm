import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { TableService } from '../shared/tables.service';
import { FormControl, CheckboxControlValueAccessor, RadioControlValueAccessor } from '@angular/forms';
import { ModelService } from '../shared/model/model.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';

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
  sort = new FormControl();
  empty = new FormControl();
  constructor(public model: ModelService, private _ts: TableService) {

    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing        
  }


  ngOnInit() {
    this.data = Observable
        .combineLatest(
            this.tn.valueChanges
              .debounceTime(400)
              //.filter(s => s.length >= 3)
              .distinctUntilChanged(),
            this.fn.valueChanges
              .debounceTime(400)
              //.filter(s => s.length >= 3)
              .distinctUntilChanged(),
            this.sort.valueChanges,
            this.empty.valueChanges,
            (tn, fn, sorta, showEmpty) => Object.assign({}, {tname: tn, fname: fn, sorta: sorta, showEmpty: showEmpty}))
        //.subscribe(r => console.log(r));
        .switchMap(so => this._ts.search(so));

        this.tn.setValue('');
        this.fn.setValue('');
        this.sort.setValue(true);
        this.empty.setValue(true);
  }

  
  sortAlphabetic(data: any[]) {

  }

  sortByCount(data: any[]) {

  }

  filterEmpty() {
      return this.data.filter(dp => !dp.isEmpty);
  }

}
