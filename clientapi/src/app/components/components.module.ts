        import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { TableBrandsComponent } from './table-Brands/table-Brands.component';
import { TableCasesComponent } from './table-cases/table-cases.component';

import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrModule } from 'ngx-toastr';
import { PostDialogC } from './table-cases/post-dialog/post-dialog';
import { Dialogbrand } from './table-Brands/dialogbrand/dialogbrand';
import { DialogbrandPost } from './table-Brands/dialogbrand-post/dialogbrand-post';
import { DelComponent } from './table-cases/del/del.component';
import { CasedialogComponent } from './table-cases/casedialog/casedialog.component';
//firebase




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        BrowserModule,
        MatProgressSpinnerModule,   
        ToastrModule.forRoot(),
    ],
    declarations: [
        TableBrandsComponent,
        TableCasesComponent,
        PostDialogC,
        Dialogbrand,
        DialogbrandPost,
        DelComponent,
        CasedialogComponent,
        
            
    ],

    exports:[ TableCasesComponent, TableBrandsComponent,PostDialogC, Dialogbrand, DialogbrandPost, DelComponent, CasedialogComponent ]
})
export class ComponentsModule { }
