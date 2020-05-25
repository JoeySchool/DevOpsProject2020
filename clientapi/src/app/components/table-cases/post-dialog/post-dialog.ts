import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GetDataService } from 'app/shared/Services/get-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'postDialogC',
  templateUrl: './post-dialog.html',
  styles: []
})
export class PostDialogC implements OnInit {
  case = {
    name: undefined,
    caseurl: undefined,
    type: undefined,
    CaseBrand: undefined,
    cost: undefined,
    volume: undefined,
    l: undefined,
    w: undefined,
    h: undefined,
    footprint: undefined,
    storage: undefined,
    psuType: undefined,
    gpuLength: undefined,
    expansionSlots: undefined,
    coolerHeight: undefined,
    fanSupport: undefined,
    radiatorSupport: undefined,
    comments: undefined,
  }
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  brands;
  constructor(public dialogRef: MatDialogRef<PostDialogC>,
    public getData: GetDataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddCase() { 
    if( this.case.caseurl == "" )
      this.case.caseurl = undefined
    var NewCase = {
      CaseName: this.case.name,
      CaseBrand: this.case.CaseBrand,
      ProductLink: this.case.caseurl,
      Cost: this.case.cost,
      Type: this.case.type,
      L: this.case.l,
      W: this.case.w,
      H: this.case.h,
      Volume: this.case.volume,
      FootPrint: this.case.footprint,
      Storage: this.case.storage,
      PsuType: this.case.psuType,
      GPULength: this.case.gpuLength,
      ExpansionSlots: this.case.expansionSlots,
      CoolerHeight: this.case.coolerHeight,
      FanSupport: this.case.fanSupport,
      RadiatorSupport: this.case.radiatorSupport,
      Comments: this.case.comments,
    }


    this.getData.PostCase(NewCase).subscribe(res => {
      console.log(res)
      this.dialogRef.close();
    }, err => {
      console.log(err)
      if (this.alerts.length == 0) {
        this.alerts.push({
          id: 3,
          type: "info",
          message: JSON.stringify(err.error),
          icon: "nc-bell-55",
        });
        this.backup = this.alerts.map((alert: IAlert) =>
          Object.assign({}, alert)
        );
      }
  })

  }
  brand(Index) {
    this.case.CaseBrand = this.getData.allBrands[Index]

  }
  Cancel() {
    this.dialogRef.close();
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
  icon?: string;
}