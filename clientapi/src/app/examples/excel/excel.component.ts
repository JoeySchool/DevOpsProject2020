import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { GetDataService } from 'app/shared/Services/get-data.service';
import { SharedbarService } from 'app/shared/Services/sharedbar.service';
import { AuthService } from 'app/shared/Services/auth.service';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styles: []
})
export class ExcelComponent {

  jsonData = null
  willDownload = false;
  caseData;

  constructor(public getData : GetDataService,
    private shared: SharedbarService,
    public google : AuthService) {
      this.getData.getAllBrands();
    this.shared.boolFooter = true;
   }

  onFileChange(ev) {
    let workBook = null;

    
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      this.jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(this.jsonData);
      console.log(this.jsonData)
      this.setDownload(dataString);
    }
    reader.readAsBinaryString(file);
  }


  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

  Post(){
    this.jsonData.Blad1.forEach(x => {
      // console.log(x)
      this.getData.PostCases(x.CaseName, x.CaseBrandId, x.ProductLink, x.Cost, x.Type, x.L, x.W, x.H, x.Volume, x.Footprint, x.Storage, x.PsuType, x.GPULength, x.ExpansionSlots, x.CoolerHeight, x.FanSupport, x.RadiatorSupport, x.Comments)
      .subscribe( y =>{
        console.log(y);
      })
    });
  }
  // Post(){
  //       this.jsonData.Sheet1.forEach(x => {
      
          

  //     this.getData.PostBrands(x.Name, x.Founded)
  //     .subscribe( y =>{
  //       console.log(y);
  //     })
  //   });
  // }
  Test(value){
    console.log(value);
  }


}