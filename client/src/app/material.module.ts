import {MatButtonModule,} from "@angular/material/button";
import {MatCheckboxModule,} from "@angular/material/checkbox";
import {MatFormFieldModule,} from "@angular/material/form-field";
import {MatInputModule,} from "@angular/material/input";
import {MatProgressSpinnerModule,} from "@angular/material/progress-spinner";


import {NgModule} from "@angular/core";

@NgModule({
    imports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class MaterialModule {

}