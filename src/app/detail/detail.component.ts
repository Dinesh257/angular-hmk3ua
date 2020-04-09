import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.angular2.grid';
import { GroupRow } from 'wijmo/wijmo.grid';
import { FlexGridDetailProvider } from 'wijmo/wijmo.grid.detail';


@Component({
    selector: 'my-app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})
export class AppDetailComponent {
  clicked: boolean = true;
      @Output() verifyClicked: EventEmitter<boolean> = new EventEmitter<boolean>();


save(){
  this.clicked =!this.clicked 
  this.verifyClicked.emit(this.clicked);
        console.log(2);

}
}