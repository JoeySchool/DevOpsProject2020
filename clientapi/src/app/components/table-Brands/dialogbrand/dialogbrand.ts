import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetDataService } from 'app/shared/Services/get-data.service';
import { AuthService } from 'app/shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-dialogbrand',
  templateUrl: './dialogbrand.html',
  styles: []
})
export class Dialogbrand {
  brand
  clicked = false;
  cases : any = [];

  Name;Founder;Ceo;Founded; HeadQuarter;
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;

  constructor(public dialogRef: MatDialogRef<Dialogbrand>,
    @Inject(MAT_DIALOG_DATA) public data,
    private getData: GetDataService,
    public auth: AuthService,
    public toastr: ToastrService) {
    console.log(data)
    this.brand = data.Brand
    this.getData.getCasesfromBrand(this.brand.id).subscribe(res => {
    this.cases =res;
    })
  }

  Edit() {
    console.log(this.auth.userData)
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
    else this.clicked = true;
    this.emptyVar();

  }
  emptyVar(){
    this.Name=undefined; this.Founder=undefined; this.Ceo=undefined; this.Founded=undefined; this.HeadQuarter=undefined;
  }
  Apply(){
    this.CheckifChanged();
    this.getData.putBrand(this.brand).subscribe(res=>{
console.log(res)
    })
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  CheckifChanged(){
    if (this.Name == undefined) this.Name = this.brand.name;
    else this.brand.name = this.Name;
    if (this.Founder == undefined) this.Founder = this.brand.founder;
    else this.brand.founder = this.Founder;
    if (this.Ceo == undefined) this.Ceo = this.brand.ceo;
    else this.brand.ceo = this.Ceo;
    if (this.Founded == undefined) this.Founded = this.brand.founded;
    else this.brand.founded = this.Founded;
    if (this.HeadQuarter == undefined) this.HeadQuarter = this.brand.headQuarter;
    else this.brand.headQuarter = this.HeadQuarter;
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
  icon?: string;
}