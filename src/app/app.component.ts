import { Component, ViewChild, OnInit } from '@angular/core';
import { CollectionView } from 'wijmo/wijmo';

import * as wjcCore from 'wijmo/wijmo';
import * as wjcGrid from 'wijmo/wijmo.angular2.grid';
import { GroupRow, CellRangeEventArgs, } from 'wijmo/wijmo.grid';
import { FlexGridDetailProvider } from 'wijmo/wijmo.grid.detail';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  show:boolean = true;
    @ViewChild('flex') jsonFlex: wjcGrid.WjFlexGrid;
    treeData: CollectionView;
    detailsData: CollectionView;

 ngOnInit() {
       this.treeData = new CollectionView(this.getTreeData());
    }
  
     onCellEditEnding(event: CellRangeEventArgs, gridname: wjcGrid.WjFlexGrid) {
      let data = Number(gridname.activeEditor.value.replace(/[^0-9\.-]+/g, ''));
      console.log(1);
      // alert(gridname.columns.length);

    }
verifyClicked(event: boolean){
this.show = event;
}
    getTreeData() {
        return [
          { name: 'Theories', length: '2:02' },
          { name: 'Giant Eyes', length: '3:29' },
          { name: 'Jovian Moons', length: '1:02' },
          { name: 'Open Minds', length: '2:41' },
          { name: 'Spacetronic Eyes', length: '3:41' } 
        ]
    }
}
