import { Component, OnInit, Inject, Input } from "@angular/core";
import { GetDataService, IBrand } from "app/shared/Services/get-data.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { GoogleImageSearchService } from "app/shared/Services/google-image-search.service";
import { AuthService } from "app/shared/Services/auth.service";
import { ToastrService } from "ngx-toastr";
import { PostDialogC } from "app/components/table-cases/post-dialog/post-dialog"
import { ICase } from "app/shared/Services/IInterfaces";
import { CommentStmt } from "@angular/compiler";
import { DelComponent } from "./del/del.component";
import { CasedialogComponent } from "./casedialog/casedialog.component";


@Component({
  selector: "app-table-cases",
  templateUrl: "./table-cases.component.html",
})
export class TableCasesComponent implements OnInit {
  Asort = 1;
  tempsort = "";
  
  caseData;
  amountCase


  page1 = 1;
  maxpage;
  totalitems =10;
  totalresults

  doubleSliderPrice = [0, 300];
  doubleSliderGpu = [0, 600];
  doubleSliderVolume = [0, 60];
  name = "";

  localprice = [];
  localgpu = [];
  localVolume = [];
  localname: string = "";

  lname = false
  lprice = false
 lvolume = false
 lgpu = false
  

  constructor(
    private getData: GetDataService,
    public dialog: MatDialog,
    public auth: AuthService) { }

  ngOnInit() {
    
    this.getData
      .getCases(
        this.page1,
        this.totalitems,
        this.localVolume,
        this.localgpu,
        this.localprice,
        this.localname
      )
      .subscribe(
        (data) => {
          console.log(data)
          this.caseData = data.data;
          this.maxpage = data.totalPages;
          this.amountCase = data.totalCount;
          this.totalresults = data.totalCount;
        },
        (error) => console.log(error)
      );
  }
  Filter() {
    this.page1 = 1;
    this.keepLocal();
    this.showLabels();
    this.sorting();
  }
  keepLocal() {
    this.localname = this.name;
    this.localgpu[0] = this.doubleSliderGpu[0];
    this.localgpu[1] = this.doubleSliderGpu[1];
    this.localprice[0] = this.doubleSliderPrice[0];
    this.localprice[1] = this.doubleSliderPrice[1];
    this.localVolume[0] = this.doubleSliderVolume[0];
    this.localVolume[1] = this.doubleSliderVolume[1];
  }

  showLabels(){
console.log(this.localname)
    if( this.localname != undefined )
      if (this.localname != "")
        this.lname = true; else this.lname =false
    if(this.localprice[0] != 0 || this.localprice[1] != 300)
      this.lprice = true; else this.lprice =false
    if(this.localVolume[0] != 0 || this.localVolume[1] != 60)
      this.lvolume = true; else this.lvolume =false
    if(this.localgpu[0] != 0 || this.localgpu[1] != 600)
      this.lgpu = true; else this.lgpu =false
  }
  removeLabel(value){

    switch(value){
      case "name":
        this.name ="";
      break;
      case "price":
        this.doubleSliderPrice[0] = 0;
        this.doubleSliderPrice[1] = 300;
      break;
      case "volume":
        this.doubleSliderVolume[0] = 0 ;
        this.doubleSliderVolume[1] = 60;
      break;
      case "gpu":
        this.doubleSliderGpu[0] = 0;
        this.doubleSliderGpu[1] = 600;
      break;
    }
    this.Filter()
  }

  Minus() {
    this.page1--;
    this.sorting();
  }
  Next() {
    this.page1++;
    this.sorting();
  }

  Abc(value) {
    this.page1 = 1;
    if (value != this.tempsort) {
      this.tempsort = value;
      this.Asort = 1;
    }
    if (this.Asort == 1) this.Asort = 2;
    else if (this.Asort == 2) this.Asort = 3;
    else if (this.Asort == 3) this.Asort = 1;

    this.sorting();
  }

  private sorting() {
    switch (this.Asort) {
      case 1:
        this.getData
          .getCases(
            this.page1,
            this.totalitems,
            this.localVolume,
            this.localgpu,
            this.localprice,
            this.localname
          )
          .subscribe((Response) => {
            this.caseData = [];
            this.caseData = Response.data;
            this.maxpage  = Response.totalPages;
            this.totalresults = Response.totalCount;
          });
        break;

      case 2:
        this.getData
          .sortCase(
            this.tempsort,
            this.totalitems,
            "desc",
            this.page1,
            this.localVolume,
            this.localgpu,
            this.localprice,
            this.localname
          )
          .subscribe((Response) => {
            this.caseData = [];
            this.caseData = Response.data;
            this.maxpage  = Response.totalPages;
            this.totalresults = Response.totalCount;

          });
        break;
      case 3:
        this.getData
          .sortCase(
            this.tempsort,
            this.totalitems,
            "asc",
            this.page1,
            this.localVolume,
            this.localgpu,
            this.localprice,
            this.localname
          )
          .subscribe((Response) => {
            this.caseData = [];
            this.caseData = Response.data;
            this.maxpage  = Response.totalPages;
            this.totalresults = Response.totalCount;

          });
        break;
    }
  }
  
  Test(value) {
    console.log(value);
    this.openDialog(value);
  }
  openDialog(value) {
    const dialogRef = this.dialog.open(CasedialogComponent, {
      width: "60%",
      data: {
        case: value,
      },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }


  openPostDialog(){
    const postDialog = this.dialog.open(PostDialogC,{
      width: "60%"
    })
    postDialog.afterClosed().subscribe((result) => { 
      this.sorting();
     });
  }
}
