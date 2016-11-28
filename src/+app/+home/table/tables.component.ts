import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { TableService } from '../../shared/tables.service';
import { FormControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
    @Input() data;
  constructor(private _ts: TableService) {
    

  }
}
