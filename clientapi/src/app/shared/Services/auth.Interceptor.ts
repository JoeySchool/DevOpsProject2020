import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (req.url.includes("https://localhost", 0)) {
      const idtoken = localStorage.getItem("id_token");

      if (idtoken) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + idtoken),
        });
        return next.handle(cloned);
      }
    } else return next.handle(req);
  }
}
