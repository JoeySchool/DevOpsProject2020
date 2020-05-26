import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {  GetDataService } from 'app/shared/Services/get-data.service';

import { GoogleImageSearchService } from 'app/shared/Services/google-image-search.service';
import { AuthService } from 'app/shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DelComponent } from '../del/del.component';

@Component({
  selector: 'app-casedialog',
  templateUrl: './casedialog.component.html',
  styles: []
})
export class CasedialogComponent {
  var
  clicked = false;
  case;
  dataimages = [];
  googleJson: any = [];
  brand : any = [];
  //bools

  boolgoogle = false;
  boolnodata = false;
  ifbrand = false;

  // 
  type;
  brandid;
  cost;
  volume;
  l;
  w;
  h;
  footprint;
  storage;
  psuType;
  gpuLength;
  expansionSlots;
  coolerHeight;
  fanSupport;
  radiatorSupport;
  comments;
  brands;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;

  constructor(
    public dialogRef: MatDialogRef<CasedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public getData: GetDataService,
    private googlepicData: GoogleImageSearchService,
    public auth: AuthService,
    public toastr: ToastrService,
    public dialog :MatDialog

  ) {
    this.brands = this.getData.allBrands;
    this.emptyVar();
    this.case = data.case;
    this.getData.GetbrandfromCase(this.case.id).subscribe((res) => {
      this.brand = res;
      console.log(this.brand);
      this.ifbrand = true;
    });

    this.googlepicData.getImages(this.case.caseName).subscribe(
      (res) => {
        this.googleJson = res;
        this.boolgoogle = true;
      },
      (error) => {
        this.boolnodata = true;
      }
    );
  }
  //setbrand for case with select
  setbrand(brandindex) {
    this.brand = this.getData.allBrands[brandindex]
  }
  Apply() {
    this.CheckifChanged();
    // this.getData.putcasev2(this.case).subscribe( res =>{
    //   console.log(res)
    // })
    this.getData
      .putCase(
        this.case.id,
        this.brand,
        this.cost,
        this.type,
        this.l,
        this.w,
        this.h,
        this.volume,
        this.footprint,
        this.storage,
        this.psuType,
        this.gpuLength,
        this.expansionSlots,
        this.coolerHeight,
        this.fanSupport,
        this.radiatorSupport,
        this.comments
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  Edit() {
    if (this.auth.userData == null || this.auth.userData == undefined) {
      console.log(this.alerts);
      if (this.alerts.length == 0) {
        this.alerts.push({
          id: 3,
          type: "info",
          message: "You have no authorization to edit this page! Please login!",
          icon: "nc-bell-55",
        });
        this.backup = this.alerts.map((alert: IAlert) =>
          Object.assign({}, alert)
        );
      }
    }
    // window.alert("not signed in");
    //this.toastr.error("You have to be logged in to do this", " Not authorized",{      disableTimeOut: true,      closeButton: true,      enableHtml: true,      positionClass: 'toast-' + 'top' + '-' +  'center'    })
    else this.clicked = true;
    this.emptyVar();
  }
  emptyVar() {
    (this.type = undefined),
      (this.brandid = undefined),
      (this.cost = undefined),
      (this.volume = undefined),
      (this.l = undefined),
      (this.w = undefined),
      (this.h = undefined),
      (this.footprint = undefined),
      (this.storage = undefined),
      (this.psuType = undefined),
      (this.gpuLength = undefined),
      (this.expansionSlots = undefined),
      (this.coolerHeight = undefined),
      (this.fanSupport = undefined),
      (this.radiatorSupport = undefined),
      (this.comments = undefined);
  }
  CheckifChanged() {
    if (this.type == undefined) this.type = this.case.type;
    else this.case.type = this.type;
    if (this.brandid == undefined) this.brandid = this.case.brandid;
    else this.case.brandid = this.brandid;
    if (this.cost == undefined) this.cost = this.case.cost;
    else this.case.cost = this.cost;
    if (this.volume == undefined) this.volume = this.case.volume;
    else this.case.volume = this.volume;
    if (this.l == undefined) this.l = this.case.l;
    else this.case.l = this.l;
    if (this.w == undefined) this.w = this.case.w;
    else this.case.w = this.w;
    if (this.h == undefined) this.h = this.case.h;
    else this.case.h = this.h;
    if (this.footprint == undefined) this.footprint = this.case.footprint;
    else this.case.footprint = this.footprint;
    if (this.storage == undefined) this.storage = this.case.storage;
    else this.case.storage = this.storage;
    if (this.psuType == undefined) this.psuType = this.case.psuType;
    else this.case.psuType = this.psuType;
    if (this.gpuLength == undefined) this.gpuLength = this.case.gpuLength;
    else this.case.gpuLength = this.gpuLength;
    if (this.expansionSlots == undefined)
      this.expansionSlots = this.case.expansionSlots;
    else this.case.expansionSlots = this.expansionSlots;
    if (this.coolerHeight == undefined)
      this.coolerHeight = this.case.coolerHeight;
    else this.case.coolerHeight = this.coolerHeight;
    if (this.fanSupport == undefined) this.fanSupport = this.case.fanSupport;
    else this.case.fanSupport = this.fanSupport;
    if (this.radiatorSupport == undefined)
      this.radiatorSupport = this.case.radiatorSupport;
    else this.case.radiatorSupport = this.radiatorSupport;
    if (this.comments == undefined) this.comments = this.case.comments;
    else this.case.comments = this.comments;
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  Delete(){
    const dialogRef = this.dialog.open(DelComponent, {
      width: "20%",
     
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result)
          console.log("F")
          else
          this.getData.deleteCase(this.case.id).subscribe( res => {
            this.dialogRef.close();
          })
     });

  }
}


export interface IAlert {
  id: number;
  type: string;
  message: string;
  icon?: string;
}
