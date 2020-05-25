import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from "@angular/common/http";
import { ICase, brandtot } from "./IInterfaces";


const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    Authorization: "authkey",
    userid: "1",
  }),
};

const headeroptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class GetDataService {
  constructor(private http: HttpClient) {}
  allBrands: any = [];
  url = "https://localhost:";
  port = 44339;

  //Cases
  PostCases(
    caseName,
    caseBrand,
    pLink,
    cost,
    Type,
    l,
    w,
    h,
    volume,
    footPrint,
    storage,
    psuType,
    gpuLength,
    expansion,
    coolerHeight,
    fanSupport,
    radiator,
    comments
  ) {
    var case1 = {
      CaseName: caseName,
      CaseBrandId: caseBrand,
      ProductLink: pLink,
      Cost: cost,
      Type: Type,
      L: l,
      W: w,
      H: h,
      Volume: volume,
      FootPrint: footPrint,
      Storage: storage,
      PsuType: psuType,
      GPULength: gpuLength,
      ExpansionSlots: expansion,
      CoolerHeight: coolerHeight,
      FanSupport: fanSupport,
      RadiatorSupport: radiator,
      Comments: comments,
    };
    return this.http.post(
      this.url + this.port + "/api/case",
      case1,
      headeroptions
    );
  }
  PostCase(case1){
    console.log(case1)
    return this.http.post(
      this.url + this.port + "/api/case",
      case1,
      headeroptions
    );
  }
  putcasev2(case1){
    console.log(case1)
    return this.http.put(this.url+this.port+ "/api/case/" + case1.id, case1,  {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    })
  }

  putCase(
    id,brand,cost,Type,l,w,h,volume,footPrint,storage,psuType,gpuLength,expansion,coolerHeight,fanSupport,radiator,comments
  ) {
    var PutCase = {
      Id:id, 
      CaseBrand: brand,
      Cost: cost,
      Type: Type,
      L: l,
      W: w,
      H: h,
      Volume: volume,
      FootPrint: footPrint,
      Storage: storage,
      PsuType: psuType,
      GPULength: gpuLength,
      ExpansionSlots: expansion,
      CoolerHeight: coolerHeight,
      FanSupport: fanSupport,
      RadiatorSupport: radiator,
      Comments: comments,
    };
    console.log(PutCase);
    return this.http.put(this.url + this.port + "/api/case/" + id, PutCase, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  //https://localhost:44339/api/case/v2/?pageIndex=0&pageSize=10&sortColumn=casename&sortOrder=asc&priceMin
  //=40&priceMax=220&gpuLengthMin=220&gpuLengthMax=320&volumeMin=12&volumeMax=45
  getCases(page, pagesize, volume, gpu, price, name) {
    page = page - 1;
    console.log(page);
    return this.http.get<ICase>(this.url + this.port 
      + "/api/case/v2?pageIndex=" + page 
      +"&pagesize="+ pagesize
      + "&filterColumn=" + "Casename"
      + "&filterQuery=" + name
      + "&pricemin="+ price[0]
      + "&pricemax="+ price[1]
      + "&gpuLengthMin="+ gpu[0]
      + "&gpuLengthMax="+ gpu[1]
      + "&volumeMin="+ volume[0]
      + "&volumeMax="+ volume[1]);
  }

  sortCase(prop,pagesize, sort, page, volume, gpu, price, name) {
    page = page - 1;
    console.log(prop, sort, page);
    return this.http.get<ICase>(
      this.url +this.port 
      + "/api/case/v2?sortColumn="+ prop 
      + "&sortOrder=" + sort 
      + "&pageIndex=" + page
      + "&pageSize=" + pagesize
      + "&filterColumn=" + "Casename"
      + "&filterQuery=" + name
      + "&pricemin="+ price[0]
      + "&pricemax="+ price[1]
      + "&gpuLengthMin="+ gpu[0]
      + "&gpuLengthMax="+ gpu[1]
      + "&volumeMin="+ volume[0]
      + "&volumeMax="+ volume[1]
      ,httpOptions
    );
  }
  deleteCase(id){
    return this.http.delete(this.url + this.port + "/api/case/"+ id)
  }


  //caseBrand
  PostBrands(name, date) {
    var brand = {
      Name: name,
      Founded: date,
    };
    return this.http.post(
      this.url + this.port + "/api/brand",
      brand,
      headeroptions
    );
  }

  GetbrandfromCase(id) {
    return this.http.get<IBrand[]>(
      this.url + this.port + "/api/case/" + id + "/brand"
    );
  }

  getAllBrands() {
    this.http.get<IBrand>(this.url + this.port + "/api/brand").subscribe((res) => {
      console.log(res)
      this.allBrands = res;
    });
  }
  getbrand(page, pagesize, name){
    page--
    return this.http.get<brandtot>(this.url + this.port 
      + "/api/brand/v2?"
      + "filterColumn=" + "Name"
      + "&filterQuery=" + name
      + "&pageIndex=" + page
      + "&pageSize=" + pagesize
      )};
  putBrand(brand ){

    var brand1 = {
      ceo: brand.ceo,
      founded: brand.founded,
      founder: brand.founder,
      headquarters: brand.headquarters,
      name: brand.name
    }
    console.log(brand1)
    return this.http.put(this.url + this.port + "/  api/brand/" + brand.id , brand1,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  getCasesfromBrand(brandid){
    return this.http.get(this.url+this.port+ "/api/brand/casesfromBrand/"+ brandid )
  }
  //Gpus
}

export interface IBrand {
  Id: number;
  Name: string;
  Founder: string;
  Founded: Date;
  Ceo: string;
  Headquarters?: any;
}

