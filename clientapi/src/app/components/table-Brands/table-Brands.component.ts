import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'app/shared/Services/get-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'app/shared/Services/auth.service';
import { Dialogbrand } from './dialogbrand/dialogbrand';
import { DialogbrandPost } from './dialogbrand-post/dialogbrand-post';

@Component({
  selector: 'app-table-Brands',
  templateUrl: './table-Brands.component.html',
})
export class TableBrandsComponent implements OnInit {

  name = "";
  page = 1;
  maxpage;
  pagesize = 10;
  brandres;
  amountbrand;

  constructor(private getData: GetDataService,
    public dialog: MatDialog,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.getData.getbrand(this.page, this.pagesize, this.name).subscribe(res => {
      console.log(res)
      this.brandres = res.data
      this.maxpage = res.totalPages
      this.amountbrand = res.totalCount
    })
  }

  Minus() {
    this.page--;
    this.sorting();
  }
  Next() {
    this.page++;
    this.sorting();
  }
  private sorting() {
    this.getData.getbrand(
      this.page, this.pagesize, this.name
    ).subscribe(res => {
      this.brandres = [];
      this.brandres = res.data
      this.maxpage = res.totalPages
      this.amountbrand = res.totalCount
    })
  }
  dia(value) {
    console.log(value)
    const dialogRef = this.dialog.open(Dialogbrand, {
      width: "50%",
      data: {
        Brand: value,
      },
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined)
        console.log(undefined, result)
      else
        console.log("not undefined", result)

    });
  }
  openPostDialog() {
    const postDialog = this.dialog.open(DialogbrandPost,{
      width: "60%"
    })
    postDialog.afterClosed().subscribe((result) => {
      if (result == undefined)
        console.log(undefined, result)
        else
        console.log("not undefined", result)

        // this.getData.PostCase(result).subscribe( res => {
        //   console.log(res)
          
        // })
     });
  }
}
